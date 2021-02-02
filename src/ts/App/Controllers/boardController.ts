
import BoardModel from '../Models/boardModel';
import { EColor, TField, IFigure } from '../Models/figureInterface';
import BoardView from '../Views/boardView';

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

    constructor(parent: HTMLElement) {
        this.view = new BoardView();
        this.view.init(parent, this.clickOnField);
    }

    public newGame(time: number): void {
        //reset constroller
        this.moveFor = EColor.White;
        this.selectedField = null;
        this.movesForSelected = [];
        this.attacksForSelected = [];
        this.timeLeftForWhite = time;
        this.timeLeftForBlack = time;

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

    private selectNewPos(pos: TField): void {
        this.view.resetStyles();

        this.selectedField = pos;
        this.movesForSelected = this.board.possibleMovesFor(this.selectedField);
        this.attacksForSelected = this.board.possibleAttacksFor(this.selectedField);

        this.view.setAsSelected(pos);
        this.movesForSelected.forEach(field => {
            this.view.setAsPossibleToMove(field);
        });
        this.attacksForSelected.forEach(field => {
            this.view.setAsPossibleToAttack(field);
        });
    }

    private resetSelectedPos() {
        this.view.resetStyles();
        this.selectedField = null;
        this.movesForSelected = [];
        this.attacksForSelected = [];
    }

    private makeMove(start: TField, end: TField, figure: IFigure): void {
        this.view.move(start, end, figure);
        this.board.move(start, end);
        this.changeTurn();
    }

    private makeAttack(start: TField, end: TField, figure: IFigure): void {
        this.view.move(start, end, figure);
        this.board.move(start, end);
        this.changeTurn();
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
            this.selectNewPos(pos);
        }
    }

    private figureAlreadySelected(pos: TField, selected: TField): void {
        const clickedFigure = this.board.get(pos);

        //we clicked another figure and have selected one
        const figure = this.board.get(selected);
        if (clickedFigure && figure) {
            //it is our figure
            if (clickedFigure.color === figure.color) {
                this.selectNewPos(pos);
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
            this.makeMove(selected, pos, figure);
        }
        this.resetSelectedPos();
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
        if(this.moveFor === EColor.White){
            this.timeLeftForWhite -= 1;
            if(this.timeLeftForWhite <= 0){
                this.gameOver(EColor.Black);
                return;
            }
            if (+process.env.DEBUG!) console.log(`Left time for White: ${this.timeLeftForWhite}sec`);
        }else{
            this.timeLeftForBlack -= 1;
            if(this.timeLeftForBlack <= 0){
                this.gameOver(EColor.White);
                return;
            }
            if (+process.env.DEBUG!) console.log(`Left time for Black: ${this.timeLeftForBlack}sec`);
        }
    };

    private changeTurn() {
        this.moveFor = this.moveFor === EColor.White ? EColor.Black : EColor.White;
    }

    private gameOver(winer: EColor) {
        this.stopTimer();
        if (+process.env.DEBUG!) console.log(`WINER! ${winer}`);
        if (+process.env.DEBUG!) console.log(`NEW GAME WILL START IN 5 SEC`);
        setTimeout(()=>{
            this.newGame(15);
        }, 5000);
    }
}