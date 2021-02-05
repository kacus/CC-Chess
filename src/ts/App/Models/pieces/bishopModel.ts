import { IFigure, EColor, EFigureType, TListOfVectors } from './figureInterface';

export default class BishopModel implements IFigure {
    public readonly color: EColor;
    public readonly name: EFigureType;
    public isMoved: boolean;
    public moveVectors: TListOfVectors;
    public attackVectors: TListOfVectors;

    constructor(color: EColor) {
        this.color = color;
        this.name = EFigureType.Bishop;
        this.moveVectors = [
            [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]], //right-bottom
            [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]], //right-top
            [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]], //left-top
            [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]], //left-bottom
        ];
        this.attackVectors = this.moveVectors;
        this.isMoved = false;
    }

    public move() {
        this.isMoved = true;
    }

    public reset(): void {
        this.isMoved = false;
    }
}