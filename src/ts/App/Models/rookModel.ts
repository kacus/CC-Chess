import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class RookModel implements IFigure {
    public readonly color: Color;
    public readonly name: FigureType;
    public isMoved: boolean;
    public moveVectors: ListOfVectors;
    public attackVectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.Rook;
        const reverse: number = this.color === Color.White ? 1 : -1;
        this.moveVectors = [
            [[0, 1 * reverse], [0, 2 * reverse]]
        ];
        this.attackVectors = [
            [[1 , reverse]],
            [[-1 * reverse, reverse]]
        ];
    }

    move() {
        this.isMoved = true;
        const reverse: number = this.color === Color.White ? 1 : -1;
        this.moveVectors = [
            [[0, 1 * reverse]]
        ];
    }
}