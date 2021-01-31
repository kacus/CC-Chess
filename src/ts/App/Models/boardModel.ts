import IBoard from './boardInterface';
import { IFigure, Color, Field, FigureType } from './figureInterface';
import {
    KingModel,
    KnightModel,
    RookModel,
    TowerModel,
    BishopModel,
    QueenModel
} from './index';

export default class BoardModel implements IBoard {
    public board: IFigure[][];
    private whiteKing: KingModel;
    private blackKing: KingModel;

    constructor() {
        this.setBoard();
    }

    public move(start: Field, end: Field): void {
        const figure = this.get(start);
        figure.move();
        this.set(end, figure);
        this.resetField(start);
    }

    public get(pos: Field): IFigure {
        return this.board[8 - pos[1]][pos[0] - 1];
    }

    public set(pos: Field, figure: IFigure): void {
        this.board[8 - pos[1]][pos[0] - 1] = figure;
    }

    private resetField(pos: Field): void {
        this.set(pos, null);
    }

    public possibleMovesFor(pos: Field): Array<Field> {
        let moves: Array<Field> = [];
        const chessman = this.get(pos);
        if (chessman === null) {
            return moves;
        }

        chessman.moveVectors.forEach(vector => {
            let indexOfMove = 0;
            while (indexOfMove < vector.length) {
                const move = vector[indexOfMove];

                const row = pos[0] + move[0];
                if (row < 1 || row > 8) {
                    break;
                }
                const col = pos[1] + move[1];
                if (col < 1 || col > 8) {
                    break;
                }
                const newPos: Field = [row, col];

                if (this.get(newPos) !== null) {
                    break;
                }
                moves.push([row, col]);
                indexOfMove += 1;
            }
        })

        return moves;
    }

    public possibleAttacksFor(pos: Field): Array<Field> {
        let attacks: Array<Field> = [];
        const chessman = this.get(pos);

        if (chessman === null) {
            return attacks;
        }

        chessman.attackVectors.forEach(vector => {
            let indexOfMove = 0;
            while (indexOfMove < vector.length) {
                const move = vector[indexOfMove];

                const row = pos[0] + move[0];
                if (row < 1 || row > 8) {
                    break;
                }
                const col = pos[1] + move[1];
                if (col < 1 || col > 8) {
                    break;
                }
                const newPos: Field = [row, col];
                const target = this.get(newPos);

                if (target !== null) {
                    if (target.color !== chessman.color) attacks.push([row, col]);
                    break;
                }
                indexOfMove += 1;
            }
        })

        return attacks;
    }

    public setBoard(): void {
        this.whiteKing = new KingModel(Color.White);
        this.blackKing = new KingModel(Color.Black);
        this.board = [
            [new TowerModel(Color.Black), new KnightModel(Color.Black), new BishopModel(Color.Black), new QueenModel(Color.Black), this.blackKing, new BishopModel(Color.Black), new KnightModel(Color.Black), new TowerModel(Color.Black)],
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
            Array(8).fill(null),
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

    public isMate(color: Color): boolean {
        return false;
    }

    public isCheckMate(color: Color): boolean {
        return false;
    }
}