import BoardModel from "../Models/boardModel";
import BoardView from "../Views/boardView";

import SaveOfCastling from "../Models/savesModels/saveOfCastling";
import SaveOfMove from "../Models/savesModels/saveOfMove";

export class MoveSaver {
    public moves: (SaveOfMove | SaveOfCastling)[];

    constructor() {
        this.moves = [];
    }

    public canUndoMove(): boolean{
        return this.moves.length > 0;
    }

    public addMove(move: (SaveOfMove | SaveOfCastling)): void {
        this.moves.push(move);
    }

    public addCastling(castling: SaveOfCastling): void {
        this.moves.push(castling);
    }

    public revertLastMove(model: BoardModel, view: BoardView): void {
        const lastMove = this.moves.pop();
        if (lastMove) {
            lastMove.revert(model, view);
        }
    }

    public reset(): void {
        this.moves = [];
    }
}