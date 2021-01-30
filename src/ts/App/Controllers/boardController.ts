
import BoardModel from '../Models/boardModel';
import { Color, Field, IFigure } from '../Models/figureInterface';
import BoardView from '../Views/boardView';

export default class BoardController {
    view: BoardView;
    board: BoardModel;
    parent: HTMLElement;
    selectedField: Field;
    movesForSelected: Array<Field>;
    attacksForSelected: Array<Field>;


    moveFor: Color;
    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.board = new BoardModel();
        this.view = new BoardView();
        this.moveFor = Color.White;
        this.selectedField = null;
        this.movesForSelected = null;
        this.attacksForSelected = null;
    }

    private isFieldOnList(pos: Field, list: Array<Field>): boolean {
        return !(list.every(elem => elem[0] !== pos[0] || elem[1] !== pos[1]));
    }

    private selectNewPos(pos: Field): void {
        this.view.resetStyles();
        console.log('Wybrano');
        console.log(pos);

        this.selectedField = pos;
        this.movesForSelected = this.board.possibleMovesFor(this.selectedField);
        this.attacksForSelected = this.board.possibleAttacksFor(this.selectedField);
        console.log(this.movesForSelected);
        console.log(this.attacksForSelected);

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
        this.movesForSelected = null;
        this.attacksForSelected = null;
    }

    private makeMove(start: Field, end: Field, figure: IFigure): void{
        this.view.move(start, end, figure);
        this.board.move(start, end);
    }

    setBoard(): void {
        this.view.init(this.parent, this.board, this.clickOnField.bind(this));
        this.moveFor = Color.White;
    }

    clickOnField(pos: Field): void {
        //We have selected figure already
        if (this.selectedField !== null) {
            const clicked = this.board.get(pos);
            //we clicked another figure
            if (clicked) {
                //it is our figure
                if (clicked.color === this.board.get(this.selectedField).color) {
                    this.selectNewPos(pos);
                    return;
                } else {
                    //it is enemy figure
                    //we can attack this figure
                    if (this.isFieldOnList(pos, this.attacksForSelected)) {
                        console.log('ATTACK');
                        return;
                    } else {
                        //we cannot attack this figure
                        this.resetSelectedPos();
                        return;
                    }
                }
            } else {
                //we clicked empty field
                if (this.isFieldOnList(pos, this.movesForSelected)) {
                    //we can move on this field
                    const figure = this.board.get(this.selectedField);
                    this.makeMove(this.selectedField, pos, figure)
                    this.resetSelectedPos();
                    return;
                } else {
                    //we can't move on this field
                    this.resetSelectedPos();
                    return;
                }
            }
        } else {
            //We didn't select figure yet
            const figureOnPos = this.board.get(pos);
            //We clicked on our figure
            if (figureOnPos && figureOnPos.color === this.moveFor) {
                this.selectNewPos(pos);
                return;
            } else{
                return;
            }
        }
    }
}