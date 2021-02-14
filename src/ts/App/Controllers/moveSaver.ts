import BoardModel from "../Models/boardModel";
import BoardView from "../Views/boardView";

import SaveOfCastling from "../Models/savesModels/saveOfCastling";
import SaveOfMove from "../Models/savesModels/saveOfMove";
import { EColor, EFigureType, IFigure, TField } from "../Models/pieces/figureInterface";
import { copyFileSync } from "fs";

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

    public isEnPassantPossible(figure:IFigure, position: TField, board: BoardModel): Array<Array<number> | string>{


    const result:Array<Array<number> | string> = [];
    const resultingField = [];
    const isPawn = figure.name === EFigureType.Pawn?true:false;
    if(!isPawn){
        return result
    }
    const [x,y] = position
    
    console.log(x);
    console.log(y);
    const leftFigure: TField = [x-1, y];
    const rightFigure: TField = [x+1, y];
    const isLeftFigure = board.get(leftFigure);
    const isRightFigure = board.get(rightFigure);
    const isLeftPawn = isLeftFigure?.name===EFigureType.Pawn;
    const isRightPawn = isRightFigure?.name===EFigureType.Pawn;

    if(this.moves.length<1){return result};
    const lastMove= this.moves[this.moves.length-1] as SaveOfMove;
    console.log(lastMove);
    if(lastMove.getLastMove){
        if(isLeftPawn){
            const { from, to, figure, moveFor } = lastMove.getLastMove();
            if(moveFor===EColor.Black){
                const isTo = to[0]===leftFigure[0] && to[1]===leftFigure[1]?true:false
                const isFrom = from[0]===leftFigure[0]&& from[1]===leftFigure[1]+2?true:false;
                if(isTo && isFrom){
                    resultingField.push(x-1);
                    resultingField.push(y+1);
                    console.log(x);
                    console.log(y);
                    result.push(resultingField);
                    result.push('lb')
                    return result
                }
            }else if(moveFor===EColor.White){
                const isTo = to[0]===leftFigure[0] && to[1]===leftFigure[1]?true:false
                const isFrom = from[0]===leftFigure[0]&& from[1]===leftFigure[1]-2;
                if(isTo && isFrom){
                    resultingField.push(x-1);
                    resultingField.push(y-1);
                    console.log(x);
                    console.log(y);
                    result.push(resultingField);
                    result.push('lw')
                    return result
                }
            }

        }else if (isRightPawn){
            const { from, to, figure, moveFor } = lastMove.getLastMove();
            if(moveFor===EColor.Black){
                const isTo = to[0]===rightFigure[0] && to[1]===rightFigure[1]?true:false;
                const isFrom = from[0]===rightFigure[0] && from[0]===rightFigure[1]+2
                if(isTo && isFrom){
                    resultingField.push(x+1);
                    resultingField.push(y+1);
                    console.log(x+1);
                    console.log(y+1);
                    console.log(result);
                    result.push(resultingField);
                    result.push('rb')
                    return result}
            }else if (moveFor===EColor.White){
                const isTo = to[0]===rightFigure[0] && to[1]===rightFigure[1]?true:false;
                const isFrom = from[0]===rightFigure[0] && from[0]===rightFigure[1]-2
                if(isTo && isFrom){
                    resultingField.push(x+1);
                    resultingField.push(y-1);
                    console.log(x+1);
                    console.log(y-1);
                    console.log(result);

                    result.push(resultingField);
                    result.push('rw')
                    return result}
            }

        }
    }

return result;

    }
}