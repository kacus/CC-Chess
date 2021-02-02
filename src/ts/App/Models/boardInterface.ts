import { IFigure, EColor, TField } from './figureInterface';

export default interface IBoard {
    board: (IFigure | null)[][];

    possibleMovesFor(pos: TField): TField[];
    possibleAttacksFor(pos: TField): TField[];

    setBoard(): void; //set board
    isMate(color: EColor): boolean; //is king with given color in mate
    isCheckMate(color: EColor): boolean; //is king with given color in checkmate

    get(pos: TField): (IFigure | null);
    set(pos: TField, figure: IFigure | null): void;

}