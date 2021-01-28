import { IChessman, Color, ChessmanType, ListOfVectors } from './chessmanInterface';

export default class RookModel implements IChessman {
    readonly color: Color;
    readonly name: ChessmanType;
    is_moved: boolean;
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;

    constructor(color: Color) {
        this.color = color;
        this.name = ChessmanType.Rook;
        let reverse: number = this.color === Color.White ? 1 : -1;
        this.move_vectors = [
            [[1 * reverse, 0], [2 * reverse, 0]]
        ];
        this.attack_vectors = [
            [[1 * reverse, -1]],
            [[1 * reverse, 1]]
        ];
    }

    move() {
        this.is_moved = true;
        let reverse: number = this.color === Color.White ? 1 : -1;
        this.move_vectors = [
            [[1 * reverse, 0]]
        ];
    }
}