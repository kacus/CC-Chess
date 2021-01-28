import { type } from "os";

export enum Color {
    Black = 'B',
    White = 'W'
};

export enum FigureType {
    Rook = 'rook',
    Tower = 'tower',
    Bishop = 'bishop',
    Knight = 'knight',
    Queen = 'queen',
    King = 'king'
};

export type Field = [number, number];
export type ListOfVectors = Array<Array<Field>>;


export interface IFigure {
    readonly color: Color;
    readonly name: FigureType;
    is_moved: boolean; //is this figure already moved in current game
    move_vectors: ListOfVectors;
    attack_vectors: ListOfVectors;
    move(): void;
};