import { IFigure, Color, Field } from './figureInterface';

export default interface IBoard {
    board: IFigure[][];

    possibleMovesFor(pos: Field): Field[];
    possibleAttacksFor(pos: Field): Field[];

    setBoard(): void; //set board
    isMate(color: Color): boolean; //is king with given color in mate
    isCheckMate(color: Color): boolean; //is king with given color in checkmate

}