import IBoard from './boardInterface';
import { IFigure, EColor, TField, EFigureType } from './figureInterface';
import {
    KingModel,
    KnightModel,
    PawnModel,
    RookModel,
    BishopModel,
    QueenModel
} from './index';

export default class BoardModel implements IBoard {
    private blackKing: KingModel = new KingModel(EColor.Black);
    private whiteKing: KingModel = new KingModel(EColor.White);
    public board: (IFigure | null)[][] = this.setBoard();

    constructor() {
    }

    public move(start: TField, end: TField): void {
        const figure = this.get(start);
        if (figure) {
            figure.move();
        }
        this.set(end, figure);
        this.resetField(start);
    }

    public get(pos: TField): (IFigure | null) {
        return this.board[8 - pos[1]][pos[0] - 1];
    }

    public set(pos: TField, figure: IFigure | null): void {
        this.board[8 - pos[1]][pos[0] - 1] = figure;
    }

    private resetField(pos: TField): void {
        this.set(pos, null);
    }

    public possibleMovesFor(pos: TField): TField[] {
        const moves: TField[] = [];
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
                const newPos: TField = [row, col];

                if (this.get(newPos) !== null) {
                    break;
                }
                moves.push([row, col]);
                indexOfMove += 1;
            }
        })

        return moves;
    }

    public possibleAttacksFor(pos: TField): TField[] {
        const attacks: TField[] = [];
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
                const newPos: TField = [row, col];
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
        this.blackKing = new KingModel(EColor.Black);
        this.whiteKing = new KingModel(EColor.White);
        return [
            this.setFirstLine(EColor.Black),
            this.setPawns(EColor.Black),
            ...(Array.from({ length: 4 }, _ => Array(8).fill(null))),
            this.setPawns(EColor.White),
            this.setFirstLine(EColor.White),
        ]
    }

    private setPawns(color: EColor): (IFigure | null)[] {
        return [...new Array(8)].map(x => new PawnModel(color));
    }

    private setFirstLine(color: EColor): (IFigure | null)[] {
        return [
            new RookModel(color),
            new KnightModel(color),
            new BishopModel(color),
            new QueenModel(color),
            color === EColor.White ? this.whiteKing : this.blackKing,
            new BishopModel(color),
            new KnightModel(color),
            new RookModel(color)
        ]
    }

    public isMate(color: EColor): boolean {
        return false;
    }

    public isCheckMate(color: EColor): boolean {
        return false;
    }
}