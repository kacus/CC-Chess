import { type } from "os";

export enum EColor {
    Black = 'b',
    White = 'w'
};

export enum EFigureType {
    Pawn = 'p',
    Rook = 'r',
    Bishop = 'b',
    Knight = 'n',
    Queen = 'q',
    King = 'k'
};

export type TField = [number, number];
export type TListOfVectors = TField[][];


export interface IFigure {
    readonly color: EColor;
    readonly name: EFigureType;
    isMoved: boolean; //is this figure already moved in current game
    moveVectors: TListOfVectors;
    attackVectors: TListOfVectors;
    move(): void;
    reset(): void;
};