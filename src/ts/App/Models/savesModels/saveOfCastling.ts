import boardView from "../../Views/boardView";
import boardModel from "../boardModel";
import { EColor, TField } from "../pieces/figureInterface";
import ISaveOf from "./ISaveOf";

export default class SaveOfCastling implements ISaveOf {
    public color: EColor;
    isKingSide: boolean;

    constructor(color: EColor, isKingSide: boolean) {
        this.color = color;
        this.isKingSide = isKingSide;
    }

    printMove(): string {
        const color = this.color === EColor.White ? 'White' : 'Black';
        const sideOfCastling = this.isKingSide ? 'King Side' : 'Queen Side';
        return `${color} did ${sideOfCastling} Castling!`;
    }
    
    revert(model: boardModel, view: boardView): void {
        const row = this.color === EColor.White ? 1 : 8;

        const initKingPos: TField = this.isKingSide ? [7, row] : [2, row];
        const initRookPos: TField = this.isKingSide ? [6, row] : [3, row];

        const newKingPos: TField = [5, row];
        const newRookPos: TField = this.isKingSide ? [8, row] : [1, row];

        const king = model.get(initKingPos)!;
        const rook = model.get(initRookPos)!;

        //revert king
        view.move(initKingPos,newKingPos, king);
        king.reset();
        
        model.set(newKingPos, king);
        model.resetField(initKingPos);

        //revert rook
        model.set(newRookPos, rook);
        model.resetField(initRookPos);

        view.move(initRookPos, newRookPos, rook);
        rook.reset();
    }
}