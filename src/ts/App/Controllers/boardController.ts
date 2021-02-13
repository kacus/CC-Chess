import BoardModel from "../Models/boardModel";
import {
  EColor,
  TField,
  IFigure,
  EFigureType,
} from "../Models/pieces/figureInterface";
import SaveOfCastling from "../Models/savesModels/saveOfCastling";
import SaveOfMove from "../Models/savesModels/saveOfMove";
import BoardView from "../Views/boardView";
import { MoveSaver } from "./moveSaver";
import MovesList from "../Views/movesList";

export default class BoardController {
  private view: BoardView;
  private board!: BoardModel;
  private selectedField!: TField | null;
  private movesForSelected!: TField[];
  private attacksForSelected!: TField[];
  private moveFor!: EColor;
  private timeLeftForBlack!: number;
  private timeLeftForWhite!: number;
  private timer!: NodeJS.Timeout;
  private moveSaver: MoveSaver;
  // private moveList: String;

  constructor(parent: HTMLElement) {
    this.view = new BoardView();
    this.view.init(parent, this.clickOnField);

    this.moveSaver = new MoveSaver();
  }

  //Starts new game
  public newGame(time: number): void {
    //reset constroller
    this.moveFor = EColor.White;
    this.selectedField = null;
    this.movesForSelected = [];
    this.attacksForSelected = [];
    this.timeLeftForWhite = time;
    this.timeLeftForBlack = time;

    //reset saved moves
    this.moveSaver.reset();

    //make new board model
    this.board = new BoardModel();

    //set up board
    this.setUpBoard(this.board);

    //start timer
    this.setUpTimer();
    if (+process.env.DEBUG!) console.log(`NEW GAME STARTS`);
  }

  //  Moves and attacks functions

  //check if given position is on given list
  private isFieldOnList(pos: TField, list: TField[]): boolean {
    return !list.every((elem) => elem[0] !== pos[0] || elem[1] !== pos[1]);
  }

  //select Figure on given position
  private selectNewFigure(pos: TField): void {
    this.view.resetStyles();

    //checks moves avaible for figure on given position
    this.selectedField = pos;
    this.movesForSelected = this.board.possibleMovesFor(this.selectedField);
    this.attacksForSelected = this.board.possibleAttacksFor(this.selectedField);

    //allow attack if it not cause 'check'
    this.attacksForSelected = this.attacksForSelected.filter((attack) => {
      return this.board.simulateMove(this.moveFor, pos, attack);
    });

    //mark figure on given position as selected
    this.view.setAsSelected(pos);
    const figure = this.board.get(pos)!;

    //check for castling
    if (figure.name === EFigureType.King) {
      const row = this.moveFor === EColor.White ? 1 : 8;
      if (this.canMakeCasting(this.moveFor, true))
        this.movesForSelected.push([7, row]);
      if (this.canMakeCasting(this.moveFor, false))
        this.movesForSelected.push([2, row]);
    }

    //display on board positions avaible to move and attack
    this.movesForSelected.forEach((field) => {
      this.view.setAsPossibleToMove(field);
    });
    this.attacksForSelected.forEach((field) => {
      this.view.setAsPossibleToAttack(field);
    });
  }

  //cancel selection
  private resetSelectedFigure() {
    this.view.resetStyles();
    this.selectedField = null;
    this.movesForSelected = [];
    this.attacksForSelected = [];
  }

  //Move given figure from start position to end position
  private makeMove(start: TField, end: TField, figure: IFigure): void {
    //Save move
    const savedMove = new SaveOfMove(figure.color, figure, start, end);
    this.moveSaver.addMove(savedMove);

    //move
    this.view.move(start, end, figure);
    this.board.move(start, end);

    //print move
    console.log(savedMove.printMove());

    //moves list

    const lastMove = savedMove.printMove();
    const movesList = new MovesList();
    movesList.init(lastMove);

    //

    //change turn
    this.changeTurn();
  }

  //Attack given figure on end position by given figure on start position
  private makeAttack(start: TField, end: TField, figure: IFigure): void {
    //get enemy figure
    const enemyFigure = this.board.get(end)!;

    //save attack
    const savedAttack = new SaveOfMove(
      figure.color,
      figure,
      start,
      end,
      enemyFigure
    );
    this.moveSaver.addMove(savedAttack);

    //attack
    this.view.move(start, end, figure);
    this.board.move(start, end);

    //print attack
    console.log(savedAttack.printMove());

    //moves list

    const lastMove = savedAttack.printMove();
    const movesList = new MovesList();
    movesList.init(lastMove);

    //

    //change turn
    this.changeTurn();
  }

  //Handler for clicking on field
  private clickOnField = (pos: TField): void => {
    if (this.selectedField) {
      //We have selected figure already
      this.figureAlreadySelected(pos, this.selectedField);
    } else {
      //We didn't select figure yet
      this.figureNotSelected(pos);
    }
  };

  //Help function for clickOnField()
  private figureNotSelected(pos: TField): void {
    //get clicked position
    const figure = this.board.get(pos);

    //if we clicked on figure select this field
    if (figure && figure.color === this.moveFor) {
      this.selectNewFigure(pos);
    }
    //otherwise do nothing
  }

  //Help function for clickOnField()
  private figureAlreadySelected(clickedPos: TField, selectedPos: TField): void {
    //get clicked field
    const clickedFigure = this.board.get(clickedPos);

    //get already clicked figure
    const figure = this.board.get(selectedPos);

    //check if we clicked figure
    if (clickedFigure && figure) {
      //check if it is our figure
      if (clickedFigure.color === figure.color) {
        //It is our figure so select new one
        this.selectNewFigure(clickedPos);
        return;
      } else {
        //it is enemy figure
        //check if this figure is in renge already selected figure
        if (this.isFieldOnList(clickedPos, this.attacksForSelected)) {
          //It is so we can perform attack
          this.makeAttack(selectedPos, clickedPos, figure);
        }
      }
      //check if we clicked on field we can move
    } else if (
      figure &&
      this.isFieldOnList(clickedPos, this.movesForSelected)
    ) {
      //we clicked empty field
      //we can move on this field

      //check for king
      if (figure.name === EFigureType.King && !figure.isMoved) {
        //check if it is field for castling
        const row = this.moveFor === EColor.White ? 1 : 8;
        if (clickedPos[0] === 7 && clickedPos[1] === row) {
          //king side castling
          this.makeCastling(this.moveFor, true);
        } else if (clickedPos[0] === 2 && clickedPos[1] === row) {
          //queen side castling
          this.makeCastling(this.moveFor, false);
        } else {
          //normal move
          this.makeMove(selectedPos, clickedPos, figure);
        }
      } else {
        //normal move
        this.makeMove(selectedPos, clickedPos, figure);
      }
    }
    this.resetSelectedFigure();
  }

  //Make castling, should be used only if canMakeCastling gives true for same parameters
  private makeCastling(color: EColor, kingSide: boolean) {
    //save castling
    const savedMove = new SaveOfCastling(color, kingSide);
    this.moveSaver.addMove(savedMove);

    const row = color === EColor.White ? 1 : 8;

    const initKingPos: TField = [5, row];
    const initRookPos: TField = kingSide ? [8, row] : [1, row];

    const newKingPos: TField = kingSide ? [7, row] : [2, row];
    const newRookPos: TField = kingSide ? [6, row] : [3, row];

    const king = this.board.get(initKingPos)!;
    const rook = this.board.get(initRookPos)!;

    //move king
    this.view.move(initKingPos, newKingPos, king);
    this.board.move(initKingPos, newKingPos);
    king.move();

    //move rook
    this.view.move(initRookPos, newRookPos, rook);
    this.board.move(initRookPos, newRookPos);
    rook.move();

    //change turn for enemy
    this.changeTurn();

    //display last move
    const lastMove = savedMove.printMove();
    const movesList = new MovesList();
    movesList.init(lastMove);
  }

  //Check if castling can be performed
  private canMakeCasting(color: EColor, kingSide: boolean): boolean {
    //Select row for king
    const row = color === EColor.White ? 1 : 8;
    //select king figure
    const king = this.board.get([5, row]);
    if (king && !king.isMoved) {
      if (kingSide) {
        //check king side castling
        if (this.board.get([6, row])) return false;
        if (this.board.get([7, row])) return false;
        const rook = this.board.get([8, row]);
        if (rook && !rook.isMoved) return true;
      } else {
        //check queen side castling
        if (this.board.get([4, row])) return false;
        if (this.board.get([3, row])) return false;
        if (this.board.get([2, row])) return false;
        const rook = this.board.get([1, row]);
        if (rook && !rook.isMoved) return true;
      }
    }
    return false;
  }

  //  Game functions

  //display board for given model
  private setUpBoard(board: BoardModel): void {
    this.view.setUpBoard(board);
  }

  // set up new timer
  private setUpTimer() {
    this.timer = setInterval(this.updateTime, 1000);
  }

  // reset timer
  private stopTimer() {
    clearInterval(this.timer);
  }

  //handler for timer
  private updateTime = (): void => {
    if (this.moveFor === EColor.White) {
      this.timeLeftForWhite -= 1;
      if (this.timeLeftForWhite <= 0) {
        this.gameOver(EColor.Black);
        return;
      }
      if (+process.env.DEBUG! && +process.env.DEBUG_TIMER!)
        console.log(`Left time for White: ${this.timeLeftForWhite}sec`);
    } else {
      this.timeLeftForBlack -= 1;
      if (this.timeLeftForBlack <= 0) {
        this.gameOver(EColor.White);
        return;
      }
      if (+process.env.DEBUG! && +process.env.DEBUG_TIMER!)
        console.log(`Left time for Black: ${this.timeLeftForBlack}sec`);
    }
  };

  //change turn for enemy player
  private changeTurn() {
    const nextMoveFor =
      this.moveFor === EColor.White ? EColor.Black : EColor.White;
    if (this.board.isCheckMate(nextMoveFor)) this.gameOver(this.moveFor);
    this.moveFor = nextMoveFor;
  }

  //handler for 'undo' last move
  public undoMove = () => {
    if (this.moveSaver.canUndoMove()) {
      this.moveSaver.revertLastMove(this.board, this.view);
      this.moveFor =
        this.moveFor === EColor.White ? EColor.Black : EColor.White;
      this.resetSelectedFigure();
    }
  };

  //game over handler
  private gameOver(winer: EColor) {
    this.stopTimer();
    if (+process.env.DEBUG!) console.log(`WINER! ${winer}`);
    if (+process.env.DEBUG!) console.log(`NEW GAME WILL START IN 5 SEC`);
    setTimeout(() => {
      this.newGame(15);
    }, 5000);
  }
}
