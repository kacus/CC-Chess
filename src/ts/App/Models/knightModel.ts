import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class KnightModel implements IFigure {
    public readonly color: Color;
    public readonly name: FigureType;
    public isMoved: boolean;
    public moveVectors: ListOfVectors;
    public attackVectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.Knight;
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
}