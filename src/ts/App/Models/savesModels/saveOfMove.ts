import { EColor, EFigureType, IFigure, TField } from "../pieces/figureInterface"
import BoardView from "../../Views/boardView";
import BoardModel from "../boardModel";
import ISaveOf from "./ISaveOf";

export default class SaveOfMove implements ISaveOf{
    private moveFor: EColor;
    private movedFigure: IFigure;
    private wasMovedFigureUnmoved: boolean;
    private from: TField;
    private to: TField;
    private attacked?: IFigure;
    private wasAttackedFigureUnmoved?: boolean;

    constructor(color: EColor, moved: IFigure, from: TField, to: TField, attacked?: IFigure) {
        this.moveFor = color;
        this.movedFigure = moved;
        this.from = from;
        this.to = to;
        this.wasMovedFigureUnmoved = moved.isMoved;
        if (attacked) {
            this.attacked = attacked;
            this.wasAttackedFigureUnmoved = attacked.isMoved;
        }
    }

    public printMove(): string {
        const color: string = this.movedFigure.color === EColor.White ? 'White' : 'Black';
        let figureName: string = '';
        switch (this.movedFigure.name) {
            case EFigureType.Pawn:
                figureName = 'Pawn';
                break;
            case EFigureType.Rook:
                figureName = 'Rook';
                break;
            case EFigureType.Knight:
                figureName = 'Knight';
                break;
            case EFigureType.Bishop:
                figureName = 'Bishop';
                break;
            case EFigureType.Queen:
                figureName = 'Queen';
                break;
            case EFigureType.King:
                figureName = 'King';
                break;
        }

        let result = `${color} ${figureName} moved from ${this.fieldToHumanNotation(this.from)} to ${this.fieldToHumanNotation(this.to)}!`;
        if (this.attacked) {
            const enemyColor: string = this.attacked.color === EColor.White ? 'White' : 'Black';
            let enemyFigureName: string = '';
            switch (this.attacked.name) {
                case EFigureType.Pawn:
                    enemyFigureName = 'Pawn';
                    break;
                case EFigureType.Rook:
                    enemyFigureName = 'Rook';
                    break;
                case EFigureType.Knight:
                    enemyFigureName = 'Knight';
                    break;
                case EFigureType.Bishop:
                    enemyFigureName = 'Bishop';
                    break;
                case EFigureType.Queen:
                    enemyFigureName = 'Queen';
                    break;
                case EFigureType.King:
                    enemyFigureName = 'King';
                    break;
            }

            result += ` And destroyed ${enemyColor} ${enemyFigureName}!`;
        }

        return result;
    }

    public revert(model: BoardModel, view: BoardView):void{
        //revert move
        if(!this.wasMovedFigureUnmoved){
            this.movedFigure.setAsUnmoved();
        }
        model.set(this.from, this.movedFigure);
        model.resetField(this.to);
        view.move(this.to, this.from, this.movedFigure);
        
        //revert attack
        if(this.attacked){
            if(!this.wasAttackedFigureUnmoved){
                this.attacked.setAsUnmoved();
            }
            model.set(this.to, this.attacked);
            view.setFigureOnField(this.to, this.attacked);
        }
    }

    private fieldToHumanNotation(field: TField): string {
        let result = `${String.fromCharCode(65 + field[0] - 1)}${field[1]}`;

        return result;
    }


    public getLastMove() {
        return {
          from: this.from,
          to: this.to,
          figure: this.movedFigure,
          moveFor: this.moveFor
        };
      }
}