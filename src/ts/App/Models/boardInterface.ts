import { KingModel } from './pieces';
import { IFigure, EColor, TField } from './pieces/figureInterface';

export default interface IBoard {
    board: (IFigure | null)[][];

    possibleMovesFor(pos: TField): TField[];
    possibleAttacksFor(pos: TField): TField[];

    setBoard(): void; //set board
    isCheck(color: EColor): boolean; //is king in check
    isCheckMate(color: EColor): boolean; //is king in checkmate

    get(pos: TField): (IFigure | null);
    set(pos: TField, figure: IFigure | null): void;

}