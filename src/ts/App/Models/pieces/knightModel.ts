import { IFigure, EColor, EFigureType, TListOfVectors } from './figureInterface';

export default class KnightModel implements IFigure {
    public readonly color: EColor;
    public readonly name: EFigureType;
    public isMoved: boolean;
    public moveVectors: TListOfVectors;
    public attackVectors: TListOfVectors;

    constructor(color: EColor) {
        this.color = color;
        this.name = EFigureType.Knight;
        this.moveVectors = [
            [[-2, -1]],
            [[-2, 1]],
            [[-1, 2]],
            [[-1, -2]],
            [[1, 2]],
            [[1, -2]],
            [[2, -1]],
            [[2, 1]],
        ];
        this.attackVectors = this.moveVectors;
        this.isMoved = false;
    }

    public move() {
        this.isMoved = true;
    }

    public setAsUnmoved():void {
        this.isMoved = false;
    }
}