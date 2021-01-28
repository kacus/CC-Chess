import IBoard from './boardInterface';
import { IFigure, Color, Field } from './figureInterface';

import KingModel from './kingModel';
import KnightModel from './knightModel';
import RookModel from './rookModel';
import TowerModel from './towerModel';
import BishopModel from './bishopModel';
import QueenModel from './queenModel';

export default class BoardModel implements IBoard {
    board: IFigure[][];
    whiteKing: KingModel;
    blackKing: KingModel;

    constructor() {
        this.setBoard();
    }

    possibleMovesFor(pos: Field): Array<Field> {
        let moves: Array<Field> = [];
        const chessman = this.board[pos[0] - 1][pos[1] - 1];
        console.log('selected!', chessman);
        if (chessman === null) {
            return moves;
        }

        chessman.move_vectors.forEach(vector => {
            let index_of_move = 0;
            while (index_of_move < vector.length) {
                const move = vector[index_of_move];

                const row = pos[0] + move[0];
                if (row < 1 || row > 8) break;
                const col = pos[1] + move[1];
                if (col < 1 || col > 8) break;

                if (this.board[row - 1][col - 1] === null) moves.push([row, col]);
                index_of_move += 1;
            }
        })

        return moves;
    }

    possibleAttacksFor(pos: Field): Array<Field> {
        let attacks: Array<Field> = [];
        const chessman = this.board[pos[0] - 1][pos[1] - 1];

        if (chessman === null) {
            return attacks;
        }

        chessman.move_vectors.forEach(vector => {
            let index_of_move = 0;
            while (index_of_move < vector.length) {
                const move = vector[index_of_move];

                const row = pos[0] + move[0];
                if (row < 1 || row > 8) break;
                const col = pos[1] + move[1];
                if (col < 1 || col > 8) break;

                const target = this.board[row - 1][col - 1];
                if (target !== null) {
                    if (target.color !== chessman.color) attacks.push([row, col]);
                    break;
                }
                index_of_move += 1;
            }
        })

        return attacks;
    }

    setBoard(): void {
        this.whiteKing = new KingModel(Color.White);
        this.blackKing = new KingModel(Color.Black);
        this.board = [
            [new TowerModel(Color.White), new KnightModel(Color.White), new BishopModel(Color.White), new QueenModel(Color.White), this.whiteKing, new BishopModel(Color.White), new KnightModel(Color.White), new TowerModel(Color.White)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new TowerModel(Color.Black), new KnightModel(Color.Black), new BishopModel(Color.Black), new QueenModel(Color.Black), this.blackKing, new BishopModel(Color.Black), new KnightModel(Color.Black), new TowerModel(Color.Black)]
        ];
        //Black rooks
        for (let i = 0; i < this.board[1].length; i++) {
            this.board[1][i] = new RookModel(Color.White);
        }
        //White rooks
        for (let i = 0; i < this.board[6].length; i++) {
            this.board[6][i] = new RookModel(Color.Black);
        }

    }

    isMate(color: Color): boolean {
        return false;
    }

    isCheckMate(color: Color): boolean {
        return false;
    }
}