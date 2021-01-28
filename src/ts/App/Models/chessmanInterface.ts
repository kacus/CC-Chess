import { type } from "os";

export enum Color {
    Black = 'B',
    White = 'W'
};

export enum ChessmanType {
    Rook = 'rook',
    Tower = 'tower',
    Bishop = 'bishop',
    Knight = 'knight',
    Queen = 'queen',
    King = 'king'
};

export type Field = [number, number];
export type ListOfVectors = Array<Array<Field>>;


export interface IChessman {
    readonly color: Color;
    readonly name: ChessmanType;
    is_moved: boolean; //is this chessman already moved in current game
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;
    move(): void;
};