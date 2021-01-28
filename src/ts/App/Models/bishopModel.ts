import { IChessman, Color, ChessmanType, ListOfVectors } from './chessmanInterface';

export default class BishopModel implements IChessman {
    readonly color: Color;
    readonly name: ChessmanType;
    is_moved: boolean;
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = ChessmanType.Bishop;
        this.move_vectors = [
            [[1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7]], //right-bottom
            [[-1, 1], [-2, 2], [-3, 3], [-4, 4], [-5, 5], [-6, 6], [-7, 7]], //right-top
            [[-1, -1], [-2, -2], [-3, -3], [-4, -4], [-5, -5], [-6, -6], [-7, -7]], //left-top
            [[1, -1], [2, -2], [3, -3], [4, -4], [5, -5], [6, -6], [7, -7]], //left-bottom
        ];
        this.attack_vectors = this.move_vectors;
    }

    move() {
        this.is_moved = true;
    }
}