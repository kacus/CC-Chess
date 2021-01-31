import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class BishopModel implements IFigure {
    public readonly color: Color;
    public readonly name: FigureType;
    public isMoved: boolean;
    public moveVectors: ListOfVectors;
    public attackVectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.Bishop;
        this.moveVectors = [
            [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]], //right-bottom
            [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]], //right-top
            [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]], //left-top
            [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]], //left-bottom
        ];
        this.attackVectors = this.moveVectors;
    }

    public move() {
        this.isMoved = true;
    }
}