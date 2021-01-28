import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class KnightModel implements IFigure {
    readonly color: Color;
    readonly name: FigureType;
    is_moved: boolean;
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.Knight;
        this.move_vectors = [
            [[-2, -1]],
            [[-2, 1]],
            [[-1, 2]],
            [[-1, -2]],
            [[1, 2]],
            [[1, -2]],
            [[2, -1]],
            [[2, 1]],
        ];
        this.attack_vectors = this.move_vectors;
    }

    move() {
        this.is_moved = true;
    }
}