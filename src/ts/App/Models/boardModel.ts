import IBoard from './boardInterface';
import { IFigure, Color, Field, FigureType } from './figureInterface';

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

    move(start: Field, end: Field): void {
        const figure = this.get(start);
        figure.move();
        this.set(end, figure);
        this.resetField(start);
    }

    get(pos: Field): IFigure {
        return this.board[8 - pos[1]][pos[0] - 1];
    }

    set(pos: Field, figure: IFigure): void {
        this.board[8 - pos[1]][pos[0] - 1] = figure;
    }

    resetField(pos: Field): void {
        this.set(pos, null);
    }

    possibleMovesFor(pos: Field): Array<Field> {
        let moves: Array<Field> = [];
        const chessman = this.get(pos);
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
                let new_pos: Field = [row, col];

                if (this.get(new_pos) !== null) break
                moves.push([row, col]);
                index_of_move += 1;
            }
        })

        return moves;
    }

    possibleAttacksFor(pos: Field): Array<Field> {
        let attacks: Array<Field> = [];
        const chessman = this.get(pos);

        if (chessman === null) {
            return attacks;
        }

        chessman.attack_vectors.forEach(vector => {
            let index_of_move = 0;
            while (index_of_move < vector.length) {
                const move = vector[index_of_move];

                const row = pos[0] + move[0];
                if (row < 1 || row > 8) break;
                const col = pos[1] + move[1];
                if (col < 1 || col > 8) break;
                let new_pos: Field = [row, col];

                const target = this.get(new_pos);
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
            [new TowerModel(Color.Black), new KnightModel(Color.Black), new BishopModel(Color.Black), new QueenModel(Color.Black), this.blackKing, new BishopModel(Color.Black), new KnightModel(Color.Black), new TowerModel(Color.Black)],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [new TowerModel(Color.White), new KnightModel(Color.White), new BishopModel(Color.White), new QueenModel(Color.White), this.whiteKing, new BishopModel(Color.White), new KnightModel(Color.White), new TowerModel(Color.White)]
        ];
        //Black rooks
        for (let i = 0; i < this.board[1].length; i++) {
            this.board[1][i] = new RookModel(Color.Black);
        }
        //White rooks
        for (let i = 0; i < this.board[6].length; i++) {
            this.board[6][i] = new RookModel(Color.White);
        }

    }

    isMate(color: Color): boolean {
        return false;
    }

    isCheckMate(color: Color): boolean {
        return false;
    }
}