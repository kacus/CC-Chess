import { IFigure, EColor, EFigureType, TListOfVectors } from './figureInterface';

export default class QueenModel implements IFigure {
    public readonly color: EColor;
    public readonly name: EFigureType;
    public isMoved: boolean;
    public moveVectors: TListOfVectors;
    public attackVectors: TListOfVectors;

    constructor(color: EColor) {
        this.color = color;
        this.name = EFigureType.Queen;
        this.moveVectors = [
            [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]], //right-bottom
            [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]], //right-top
            [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]], //left-top
            [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]], //left-bottom
            [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], //bottom
            [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]], //top
            [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], //right
            [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]] //left
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