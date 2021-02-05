
import BoardModel from '../Models/boardModel';
import { EColor, TField, IFigure, EFigureType } from '../Models/pieces/figureInterface';
import SaveOfCastling from '../Models/savesModels/saveOfCastling';
import SaveOfMove from '../Models/savesModels/saveOfMove';
import BoardView from '../Views/boardView';
import { MoveSaver } from './moveSaver';

export default class BoardController {
    private view: BoardView;
    private board!: BoardModel;
    private selectedField!: TField | null;
    private movesForSelected!: TField[];
    private attacksForSelected!: TField[];
    private moveFor!: EColor;
    private timeLeftForBlack!: number;
    private timeLeftForWhite!: number;
    private timer!: NodeJS.Timeout;
    private moveSaver: MoveSaver;

    constructor(parent: HTMLElement) {
        this.view = new BoardView();
        this.view.init(parent, this.clickOnField);

        this.moveSaver = new MoveSaver();
    }

    public newGame(time: number): void {
        //reset constroller
        this.moveFor = EColor.White;
        this.selectedField = null;
        this.movesForSelected = [];
        this.attacksForSelected = [];
        this.timeLeftForWhite = time;
        this.timeLeftForBlack = time;

        //reset saved moves
        this.moveSaver.reset();

        //make new board model
        this.board = new BoardModel();

        //set up board
        this.setUpBoard(this.board);

        //start timer
        this.setUpTimer();
        if (+process.env.DEBUG!) console.log(`NEW GAME STARTS`);
    }

    //Moves and attacks functions
    private isFieldOnList(pos: TField, list: TField[]): boolean {
        return !(list.every(elem => elem[0] !== pos[0] || elem[1] !== pos[1]));
    }

    private selectNewFigure(pos: TField): void {
        this.view.resetStyles();

        this.selectedField = pos;
        this.movesForSelected = this.board.possibleMovesFor(this.selectedField);
        this.attacksForSelected = this.board.possibleAttacksFor(this.selectedField);

        this.view.setAsSelected(pos);
        const figure = this.board.get(pos)!;

        if (figure.name === EFigureType.King) {
            const row = this.moveFor === EColor.White ? 1 : 8;
            if (this.canMakeCasting(this.moveFor, true)) this.movesForSelected.push([7, row]);
            if (this.canMakeCasting(this.moveFor, false)) this.movesForSelected.push([2, row]);
        }

        this.movesForSelected.forEach(field => {
            this.view.setAsPossibleToMove(field);
        });
        this.attacksForSelected.forEach(field => {
            this.view.setAsPossibleToAttack(field);
        });
    }

    private resetSelectedFigure() {
        this.view.resetStyles();
        this.selectedField = null;
        this.movesForSelected = [];
        this.attacksForSelected = [];
    }

    private makeMove(start: TField, end: TField, figure: IFigure): void {
        const savedMove = new SaveOfMove(figure.color, figure, start, end);
        this.moveSaver.addMove(savedMove);

        this.view.move(start, end, figure);
        this.board.move(start, end);
        this.changeTurn();

        console.log(savedMove.printMove());
    }

    private makeAttack(start: TField, end: TField, figure: IFigure): void {
        const enemyFigure = this.board.get(end)!;
        const savedAttack = new SaveOfMove(figure.color, figure, start, end, enemyFigure);
        this.moveSaver.addMove(savedAttack);

        this.view.move(start, end, figure);
        this.board.move(start, end);
        this.changeTurn();

        console.log(savedAttack.printMove());
    }

    private clickOnField = (pos: TField): void => {
        //We have selected figure already
        if (this.selectedField) {
            this.figureAlreadySelected(pos, this.selectedField);
        } else {
            this.figureNotSelected(pos);
        }
    }

    private figureNotSelected(pos: TField): void {
        //We didn't select figure yet
        const figure = this.board.get(pos);

        //We clicked on our figure
        if (figure && figure.color === this.moveFor) {
            this.selectNewFigure(pos);
        }
    }

    private figureAlreadySelected(pos: TField, selected: TField): void {
        const clickedFigure = this.board.get(pos);

        //we clicked another figure and have selected one
        const figure = this.board.get(selected);
        if (clickedFigure && figure) {
            //it is our figure
            if (clickedFigure.color === figure.color) {
                this.selectNewFigure(pos);
                return;
            } else {
                //it is enemy figure
                //we can attack this figure
                if (this.isFieldOnList(pos, this.attacksForSelected)) {
                    this.makeAttack(selected, pos, figure);
                }
            }
        } else if (figure && this.isFieldOnList(pos, this.movesForSelected)) {
            //we clicked empty field
            //we can move on this field
            if (figure.name === EFigureType.King && !figure.isMoved) {
                const row = this.moveFor === EColor.White ? 1 : 8;
                if (pos[0] === 7 && pos[1] === row) {
                    //king side castling
                    this.makeCastling(this.moveFor, true);
                } else if (pos[0] === 2 && pos[1] === row) {
                    //queen side castling
                    this.makeCastling(this.moveFor, false);
                } else {
                    //normal move
                    this.makeMove(selected, pos, figure);
                }
            } else {
                //normal move
                this.makeMove(selected, pos, figure);
            }
        }
        this.resetSelectedFigure();
    }

    private makeCastling(color: EColor, kingSide: boolean) {
        //save castling
        const savedMove = new SaveOfCastling(color, kingSide);
        this.moveSaver.addMove(savedMove);
        
        const row = color === EColor.White ? 1 : 8;

        const initKingPos: TField = [5, row];
        const initRookPos: TField = kingSide ? [8, row] : [1, row];

        const newKingPos: TField = kingSide ? [7, row] : [2, row];
        const newRookPos: TField = kingSide ? [6, row] : [3, row];

        const king = this.board.get(initKingPos)!;
        const rook = this.board.get(initRookPos)!;

        //move king
        this.view.move(initKingPos, newKingPos, king);
        this.board.move(initKingPos, newKingPos);
        king.move();

        //move rook
        this.view.move(initRookPos, newRookPos, rook);
        this.board.move(initRookPos, newRookPos);
        rook.move();


        this.changeTurn();
    }

    private canMakeCasting(color: EColor, kingSide: boolean): boolean {
        const row = color === EColor.White ? 1 : 8;
        const king = this.board.get([5, row]);
        if (king && !king.isMoved) {
            if (kingSide) {
                //king side castling
                if (this.board.get([6, row])) return false;
                if (this.board.get([7, row])) return false;
                const rook = this.board.get([8, row]);
                if (rook && !rook.isMoved) return true;
            } else {
                //queen side castling
                if (this.board.get([4, row])) return false;
                if (this.board.get([3, row])) return false;
                if (this.board.get([2, row])) return false;
                const rook = this.board.get([1, row]);
                if (rook && !rook.isMoved) return true;
            }
        }

        return false;
    }

    //Game functions
    private setUpBoard(board: BoardModel): void {
        this.view.setUpBoard(board);
    }

    private setUpTimer() {
        this.timer = setInterval(this.updateTime, 1000);
    }

    private stopTimer() {
        clearInterval(this.timer);
    }

    private updateTime = (): void => {
        if (this.moveFor === EColor.White) {
            this.timeLeftForWhite -= 1;
            if (this.timeLeftForWhite <= 0) {
                this.gameOver(EColor.Black);
                return;
            }
            if (+process.env.DEBUG! && +process.env.DEBUG_TIMER!) console.log(`Left time for White: ${this.timeLeftForWhite}sec`);
        } else {
            this.timeLeftForBlack -= 1;
            if (this.timeLeftForBlack <= 0) {
                this.gameOver(EColor.White);
                return;
            }
            if (+process.env.DEBUG! && +process.env.DEBUG_TIMER!) console.log(`Left time for Black: ${this.timeLeftForBlack}sec`);
        }
    };

    private changeTurn() {
        this.moveFor = this.moveFor === EColor.White ? EColor.Black : EColor.White;
    }

    public undoMove = () => {
        if(this.moveSaver.canUndoMove()){
            this.moveSaver.revertLastMove(this.board, this.view);
            this.moveFor = this.moveFor === EColor.White ? EColor.Black : EColor.White;
            this.resetSelectedFigure();
        }
    }

    private gameOver(winer: EColor) {
        this.stopTimer();
        if (+process.env.DEBUG!) console.log(`WINER! ${winer}`);
        if (+process.env.DEBUG!) console.log(`NEW GAME WILL START IN 5 SEC`);
        setTimeout(() => {
            this.newGame(15);
        }, 5000);
    }
}