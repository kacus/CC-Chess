import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class KingModel implements IFigure {
    public readonly color: Color;
    public readonly name: FigureType;
    public isMoved: boolean;
    public moveVectors: ListOfVectors;
    public attackVectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.King;
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
}