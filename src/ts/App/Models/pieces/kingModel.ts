import { IFigure, EColor, EFigureType, TListOfVectors } from './figureInterface';

export default class KingModel implements IFigure {
    public readonly color: EColor;
    public readonly name: EFigureType;
    public isMoved: boolean;
    public moveVectors: TListOfVectors;
    public attackVectors: TListOfVectors;

    constructor(color: EColor) {
        this.color = color;
        this.name = EFigureType.King;
        this.moveVectors = [
            [[-1, -1]],
            [[-1, 0]],
            [[-1, 1]],
            [[0, -1]],
            [[0, 0]],
            [[0, 1]],
            [[1, -1]],
            [[1, 0]],
            [[1, 1]],
        ];
        this.attackVectors = this.moveVectors;
        this.isMoved = false;
    }

    public move() {
        this.isMoved = true;
    }

    public reset():void {
        this.isMoved = false;
    }
}