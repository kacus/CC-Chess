import { copyFile } from 'fs';
import IBoard from './boardInterface';
import { IFigure, EColor, TField, EFigureType } from './pieces/figureInterface';
import {
    KingModel,
    KnightModel,
    PawnModel,
    RookModel,
    BishopModel,
    QueenModel
} from './pieces/index';

import { MoveSaver } from '../Controllers/moveSaver'
import SaveOfMove from './savesModels/saveOfMove';


export default class BoardModel implements IBoard {
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

    public resetField(pos: TField): void {
        this.set(pos, null);
    }

    public possibleMovesFor(pos: TField): TField[] {

        const moves: TField[] = [];
        const figure = this.get(pos);
        if (figure === null) {
            return moves;
        }

        figure.moveVectors.forEach(vector => {
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

                //check if move cause 'check'
                if (!this.simulateMove(figure.color, pos, newPos)) {
                    break;
                }


                moves.push([row, col]);
                indexOfMove += 1;
            }
        })

        return moves;
    }


    public possibleAttacksFor(pos: TField, moveSaver?: MoveSaver): TField[] {

        
        const attacks: TField[] = [];
        const figure = this.get(pos);


        if (figure === null) {
            return attacks;
        }


        figure.attackVectors.forEach(vector => {
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
                    if (target.color !== figure.color) {
                        attacks.push([row, col]);
                    }
                    break;
                }
                indexOfMove += 1;
            }
        });


        if(moveSaver){
            const addEnPassantField = moveSaver.isEnPassantPossible(figure, pos, this.deepCopy());
            console.log(addEnPassantField);  

            if(addEnPassantField.length>0){ 
                attacks.push(addEnPassantField[0] as TField);
            }
        }
        
        console.log(attacks)
        return attacks;
    }

    public setBoard(): (IFigure | null)[][] {
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
            color === EColor.White ? new KingModel(EColor.White) : new KingModel(EColor.Black),
            new BishopModel(color),
            new KnightModel(color),
            new RookModel(color)
        ]
    }

    private deepCopy(): BoardModel {
        const copy = new BoardModel();
        copy.board = [];
        this.board.forEach(line => {
            const row: (IFigure | null)[] = [];
            line.forEach(figure => {
                if (figure) {
                    const copyOfFigure = Object.assign(Object.create(Object.getPrototypeOf(figure)), figure);
                    row.push(copyOfFigure);
                    return;
                } else {
                    row.push(null);
                }

            });
            copy.board.push(row);
        });
        return copy;
    }

    //Is king in check
    public isCheck(color: EColor): boolean {
        for (let y = 1; y <= 8; y++) {
            for (let x = 1; x <= 8; x++) {
                const pos: TField = [x, y];
                const figure = this.get(pos);
                if (figure && figure.color !== color) {
                    const attackedFields = this.possibleAttacksFor(pos);
                    for (let z = 0; z < attackedFields.length; z++) {
                        const attackedFigure = this.get(attackedFields[z])!;
                        if (attackedFigure.name === EFigureType.King && attackedFigure.color === color) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    public isCheckMate(color: EColor): boolean {
        if (!this.isCheck(color)) return false;

        for (let y = 1; y <= 8; y++) {
            for (let x = 1; x <= 8; x++) {
                const pos: TField = [x, y];
                const figure = this.get(pos);
                if (figure && figure.color === color) {
                    //check if attack can save king
                    let attackedFields = this.possibleAttacksFor(pos);
                    attackedFields = attackedFields.filter(attack => {
                        return this.simulateMove(color, pos, attack);
                    });
                    if (attackedFields.length > 0) return false;
                    //check if move can save king
                    const fieldsToMove = this.possibleMovesFor(pos);
                    if (fieldsToMove.length > 0) return false;
                }
            }
        }
        console.log('CHECK MATE!');
        return true;
    }

    // check if move can be made for given color
    public simulateMove(color: EColor, from: TField, to: TField): boolean {
        const copy = this.deepCopy();
        copy.move(from, to);

        //return false if move will cause 'check', return true otherwise
        return !copy.isCheck(color);
    }






}