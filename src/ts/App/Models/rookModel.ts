import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class RookModel implements IFigure {
    readonly color: Color;
    readonly name: FigureType;
    is_moved: boolean;
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.Rook;
        let reverse: number = this.color === Color.White ? 1 : -1;
        this.move_vectors = [
            [[0, 1 * reverse], [0, 2 * reverse]]
        ];
        this.attack_vectors = [
            [[1 , reverse]],
            [[-1 * reverse, reverse]]
        ];
    }

    move() {
        this.is_moved = true;
        let reverse: number = this.color === Color.White ? 1 : -1;
        this.move_vectors = [
            [[0, 1 * reverse]]
        ];
    }
}