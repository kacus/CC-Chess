import { IChessman, Color, ChessmanType, ListOfVectors } from './chessmanInterface';

export default class KnightModel implements IChessman {
    readonly color: Color;
    readonly name: ChessmanType;
    is_moved: boolean;
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = ChessmanType.Knight;
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