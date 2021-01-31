import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class TowerModel implements IFigure {
    public readonly color: Color;
    public readonly name: FigureType;
    public isMoved: boolean;
    public moveVectors: ListOfVectors;
    public attackVectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.Tower;
        this.moveVectors = [
            [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], //top
            [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]], //bottom
            [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], //right
            [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]] //left
        ];
        this.attackVectors = this.moveVectors;
    }

    move() {
        this.isMoved = true;
    }
}