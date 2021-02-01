import { type } from "os";

export enum Color {
    Black = 'b',
    White = 'w'
};

export enum FigureType {
    Rook = 'p',
    Tower = 'r',
    Bishop = 'b',
    Knight = 'n',
    Queen = 'q',
    King = 'k'
};

export type Field = [number, number];
export type ListOfVectors = Field[][];


export interface IFigure {
    readonly color: Color;
    readonly name: FigureType;
    isMoved: boolean; //is this figure already moved in current game
    moveVectors: ListOfVectors;
    attackVectors: ListOfVectors;
    move(): void;
};