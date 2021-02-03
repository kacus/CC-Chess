import { IFigure, EColor, EFigureType, TListOfVectors } from './figureInterface';

export default class TowerModel implements IFigure {
    public readonly color: EColor;
    public readonly name: EFigureType;
    public isMoved: boolean;
    public moveVectors: TListOfVectors;
    public attackVectors: TListOfVectors;

    constructor(color: EColor) {
        this.color = color;
        this.name = EFigureType.Rook;
        this.moveVectors = [
            [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], //top
            [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]], //bottom
            [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], //right
            [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]] //left
        ];
        this.attackVectors = this.moveVectors;
        this.isMoved = false;
    }

    move() {
        this.isMoved = true;
    }
}