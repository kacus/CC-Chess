import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class KingModel implements IFigure {
    readonly color: Color;
    readonly name: FigureType;
    is_moved: boolean;
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.King;
        this.move_vectors = [
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
        this.attack_vectors = this.move_vectors;
    }

    move() {
        this.is_moved = true;
    }
}