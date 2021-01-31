
import BoardModel from '../Models/boardModel';
import { Color, Field, IFigure } from '../Models/figureInterface';
import BoardView from '../Views/boardView';

export default class BoardController {
    private view: BoardView;
    private board: BoardModel;
    private parent: HTMLElement;
    private selectedField: Field | null;
    private movesForSelected: Field[];
    private attacksForSelected: Field[];
    private moveFor: Color;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.board = new BoardModel();
        this.view = new BoardView();
        this.moveFor = Color.White;
        this.selectedField = null;
        this.movesForSelected = [];
        this.attacksForSelected = [];
    }

    private isFieldOnList(pos: Field, list: Field[]): boolean {
        return !(list.every(elem => elem[0] !== pos[0] || elem[1] !== pos[1]));
    }

    private selectNewPos(pos: Field): void {
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

    private makeMove(start: Field, end: Field, figure: IFigure): void {
        this.view.move(start, end, figure);
        this.board.move(start, end);
    }

    public setBoard(): void {
        this.view.init(this.parent, this.board, this.clickOnField);
        this.moveFor = Color.White;
    }

    private clickOnField = (pos: Field): void => {
        //We have selected figure already
        if (this.selectedField) {
            this.figureAlreadySelected(pos, this.selectedField);
        } else {
            this.figureNotSelected(pos);
        }
    }

    private figureNotSelected(pos: Field): void {
        //We didn't select figure yet
        const figure = this.board.get(pos);

        //We clicked on our figure
        if (figure && figure.color === this.moveFor) {
            this.selectNewPos(pos);
        }
    }

    private figureAlreadySelected(pos: Field, selected: Field): void {
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
                    console.log('ATTACK');
                }
            }
        } else if (figure && this.isFieldOnList(pos, this.movesForSelected)) {
            //we clicked empty field
            //we can move on this field
            this.makeMove(selected, pos, figure);
        }
        this.resetSelectedPos();
    }
}