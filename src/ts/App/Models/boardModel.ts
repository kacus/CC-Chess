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
    private blackKing: KingModel = new KingModel(Color.Black);
    private whiteKing: KingModel = new KingModel(Color.White);
    public board: (IFigure | null)[][] = this.setBoard();

    constructor() {
    }

    public move(start: Field, end: Field): void {
        const figure = this.get(start);
        if (figure) {
            figure.move();
        }
        this.set(end, figure);
        this.resetField(start);
    }

    public get(pos: Field): (IFigure | null) {
        return this.board[8 - pos[1]][pos[0] - 1];
    }

    public set(pos: Field, figure: IFigure | null): void {
        this.board[8 - pos[1]][pos[0] - 1] = figure;
    }

    private resetField(pos: Field): void {
        this.set(pos, null);
    }

    public possibleMovesFor(pos: Field): Field[] {
        const moves: Field[] = [];
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

    public possibleAttacksFor(pos: Field): Field[] {
        const attacks: Field[] = [];
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

    public setBoard(): (IFigure | null)[][] {
        this.blackKing = new KingModel(Color.Black);
        this.whiteKing = new KingModel(Color.White);
        return [
            this.setFirstLine(Color.Black),
            this.setRooks(Color.Black),
            ...(Array.from({ length: 4 }, _ => Array(8).fill(null))),
            this.setRooks(Color.White),
            this.setFirstLine(Color.White),
        ]
    }

    private setRooks(color: Color): (IFigure | null)[] {
        return [...new Array(8)].map(x => new RookModel(color));
    }

    private setFirstLine(color: Color): (IFigure | null)[] {
        return [
            new TowerModel(color),
            new KnightModel(color),
            new BishopModel(color),
            new QueenModel(color),
            color === Color.White ? this.whiteKing : this.blackKing,
            new BishopModel(color),
            new KnightModel(color),
            new TowerModel(color)
        ]
    }

    public isMate(color: Color): boolean {
        return false;
    }

    public isCheckMate(color: Color): boolean {
        return false;
    }
}