import IBoard from "../Models/boardInterface";
import BoardModel from "../Models/boardModel";
import {
  EColor,
  TField,
  EFigureType,
  IFigure,
} from "../Models/pieces/figureInterface";
import StageView from "./stageView";

export default class BoardView {
  public init(parent: HTMLElement, clickHandler: (pos: TField) => void): void {
    const board = document.createElement("div");
    board.classList.add("chessboard");

    //game stage
    const stage1 = document.createElement("div");
    const stage2 = document.createElement("div");
    const container = document.createElement("div");

    stage1.classList.add("stage");
    const blackStage = new StageView();
    blackStage.init(stage1, EColor.White, "Player 1");
    stage2.classList.add("stage");
    container.classList.add("container");
    const gamePanel = document.createElement('div');
    gamePanel.classList.add('game__panel');

    const whiteStage = new StageView();
    whiteStage.init(stage2, EColor.Black, "Player 2");

    //

    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        const field = document.createElement("div");

        field.dataset.x = 1 + x + "";
        field.dataset.y = 8 - y + "";

        field.addEventListener("click", () => {
          const fieldPos: TField = [
            parseInt(field.dataset.x!),
            parseInt(field.dataset.y!),
          ];
          clickHandler(fieldPos);
        });

        field.classList.add("chessboard__field");

        board.appendChild(field);
      }
    }

    //
    parent.appendChild(container);
    container.appendChild(gamePanel);
    gamePanel.appendChild(stage1);
    gamePanel.appendChild(board);
    gamePanel.appendChild(stage2);

    //
  }

  public setUpBoard(board: IBoard): void {
    for (let y = 1; y <= 8; y++) {
      for (let x = 1; x <= 8; x++) {
        const pos: TField = [x, y];
        const figure = board.get(pos);
        const field = this.getField(pos);
        this.resetField(pos);
        if (figure) {
          const figureImage = this.getFigureImage(figure);
          field.appendChild(figureImage);
        }
      }
    }
  }

  private getFigureImage(figure: IFigure): HTMLElement {
    const figureImg = document.createElement("img");

    //Map figure to file name
    const file = figure.color + figure.name;

    figureImg.setAttribute("src", `./static/assets/pieces/kosal/${file}.svg`);
    figureImg.setAttribute("alt", `${figure.color} ${figure.name}`);

    figureImg.classList.add("chessboard__figure");

    return figureImg;
  }

  private resetField(pos: TField): void {
    const field = this.getField(pos);
    field.innerHTML = "";
    field.classList.value = "";
    field.classList.add("chessboard__field");
  }

  private setFigureOnField(pos: TField, figure: IFigure): void {
    const field = this.getField(pos);
    //
    if (field.hasChildNodes()) {
      const figureSrc = field.children[0].attributes[0].value;
      const figureType = figureSrc.slice(
        figureSrc.length - 6,
        figureSrc.length - 4
      );

      let figType;

      if (figureType[1] === EFigureType.Pawn) {
        figType = EFigureType.Pawn;
      } else if (figureType[1] === EFigureType.Bishop) {
        figType = EFigureType.Bishop;
      } else if (figureType[1] === EFigureType.Knight) {
        figType = EFigureType.Knight;
      } else if (figureType[1] === EFigureType.Rook) {
        figType = EFigureType.Rook;
      } else if (figureType[1] === EFigureType.Queen) {
        figType = EFigureType.Queen;
      }

      const color =
        figure.color === EColor.White ? "last-of-type" : "first-of-type";

      const figSymbol = document.querySelector<HTMLElement>(
        `.stage:${color} > .game__stage>.figures__list > .chessboard__figure__stage.${figType}`
      )!;
      figSymbol.style.filter = "invert(0)";
      console.log(figSymbol);
      figSymbol.classList.remove(`${figType}`);
    }
    //

    const figureImage = this.getFigureImage(figure);
    field.innerHTML = "";
    field.appendChild(figureImage);
  }

  public getField(pos: TField): Element {
    const field = document.querySelector(
      `[data-x="${pos[0]}"][data-y="${pos[1]}"]`
    )!;

    return field;
  }

  public move(start: TField, end: TField, figure: IFigure): void {
    this.setFigureOnField(end, figure);
    this.resetField(start);
    this.resetStyles();
  }

  public setAsPossibleToMove(pos: TField): void {
    const field = this.getField(pos);
    field.classList.add("chessboard__field--possible_move");
  }

  public setAsPossibleToAttack(pos: TField): void {
    const field = this.getField(pos);
    field.classList.add("chessboard__field--possible_attack");
  }

  public setAsSelected(pos: TField): void {
    const field = this.getField(pos);
    field.classList.add("chessboard__field--selected");
  }

  public resetStyles() {
    const fields = document.querySelectorAll(".chessboard__field");
    fields.forEach((field) => {
      field.classList.value = "";
      field.classList.add("chessboard__field");
    });
  }
  public timeDispaly(time: number, color: EColor) {
    if (color === EColor.White) {
      const obj = document.querySelector(".stage:last-child > .time")!;
      obj.innerHTML = time + "";
    } else {
      const obj = document.querySelector(".stage:first-child > .time")!;
      obj.innerHTML = time + "";
    }
  }
  public getStartTime(time: number) {
    const startTime = document.querySelector(".time")!;
    startTime.innerHTML = time + "";
  }
}
