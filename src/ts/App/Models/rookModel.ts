import { IFigure, EColor, EFigureType, TListOfVectors } from './figureInterface';

export default class RookModel implements IFigure {
    public readonly color: EColor;
    public readonly name: EFigureType;
    public isMoved: boolean;
    public moveVectors: TListOfVectors;
    public attackVectors: TListOfVectors;

    constructor(color: EColor) {
        this.color = color;
        this.name = EFigureType.Rook;
        const reverse: number = this.color === EColor.White ? 1 : -1;
        this.moveVectors = [
            [[0, 1 * reverse], [0, 2 * reverse]]
        ];
        this.attackVectors = [
            [[1 , reverse]],
            [[-1 * reverse, reverse]]
        ];
        this.isMoved = false;
    }

    move() {
        this.isMoved = true;
        const reverse: number = this.color === EColor.White ? 1 : -1;
        this.moveVectors = [
            [[0, 1 * reverse]]
        ];
    }
}