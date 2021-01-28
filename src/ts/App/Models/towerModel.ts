import { IFigure, Color, FigureType, ListOfVectors } from './figureInterface';

export default class TowerModel implements IFigure {
    readonly color: Color;
    readonly name: FigureType;
    is_moved: boolean;
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = FigureType.Tower;
        this.move_vectors = [
            [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0]], //top
            [[-1, 0], [-2, 0], [-3, 0], [-4, 0], [-5, 0], [-6, 0], [-7, 0]], //bottom
            [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7]], //right
            [[0, -1], [0, -2], [0, -3], [0, -4], [0, -5], [0, -6], [0, -7]] //left
        ];
        this.attack_vectors = this.move_vectors;
    }

    move() {
        this.is_moved = true;
    }
}