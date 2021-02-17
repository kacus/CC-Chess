import IBoard from "../Models/boardInterface";
import {
  EColor,
  TField,
  IFigure,
} from "../Models/pieces/figureInterface";
import StageView from "./stageView";
import TabsView from "./tabsView";

export default class BoardView {
  public init(parent: HTMLElement, clickHandler: (pos: TField) => void): void {
    const board = document.createElement("div");
    board.classList.add("chessboard");

    //game stage
    const stage1 = document.createElement("div");
    const stage2 = document.createElement("div");
    const container = document.createElement("div");

    stage1.classList.add("stage");
    const blackStage = new StageView("first__player");
    blackStage.init(stage1, EColor.White, "Player 1");
    stage2.classList.add("stage");
    container.classList.add("container");
    const gamePanel = document.createElement("div");
    gamePanel.classList.add("game__panel");
    gamePanel.id = "game__panel";
    const settingsPanel = document.createElement("div");
    settingsPanel.classList.add("settings__panel");

    const whiteStage = new StageView("second__player");
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
    container.appendChild(settingsPanel);

    const menu = new TabsView();
    menu.init(settingsPanel);

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

  public setFigureOnField(pos: TField, figure: IFigure, enemyField?:TField): void {
    const field = this.getField(pos);
    //

    if(enemyField){
      const enemyFieldPos = this.getField(enemyField)
      if (enemyFieldPos.hasChildNodes()) {
        const figureSrc = enemyFieldPos.children[0].attributes[0].value;
        const figureType = figureSrc.slice(
          figureSrc.length - 6,
          figureSrc.length - 4
        );
  
        let figType = figureType[1];
        const color =
          figure.color === EColor.White ? "last-of-type" : "first-of-type";
  
        const figSymbol = document.querySelector<HTMLElement>(
          `.stage:${color} > .game__stage>.figures__list > .chessboard__figure__stage.${figType}`
        )!;
        figSymbol.style.filter = "invert(0)";
        console.log(figSymbol);
        figSymbol.classList.remove(`${figType}`);
      }
      const figureImage = this.getFigureImage(figure);
      field.innerHTML = "";
      field.appendChild(figureImage);
    }else{
      if (field.hasChildNodes()) {
        const figureSrc = field.children[0].attributes[0].value;
        const figureType = figureSrc.slice(
          figureSrc.length - 6,
          figureSrc.length - 4
        );
  
        let figType = figureType[1];
        const color =
          figure.color === EColor.White ? "last-of-type" : "first-of-type";
  
        const figSymbol = document.querySelector<HTMLElement>(
          `.stage:${color} > .game__stage>.figures__list > .chessboard__figure__stage.${figType}`
        )!;
        figSymbol.style.filter = "invert(0)";
        console.log(figSymbol);
        figSymbol.classList.remove(`${figType}`);
      }
      const figureImage = this.getFigureImage(figure);
      field.innerHTML = "";
      field.appendChild(figureImage);

    }

    //


  }

  public getField(pos: TField): Element {
    const field = document.querySelector(
      `[data-x="${pos[0]}"][data-y="${pos[1]}"]`
    )!;

    return field;
  }
  public move(start: TField, end: TField, figure: IFigure, enemyField?: TField): void {
    if(enemyField){
      this.setFigureOnField(end, figure, enemyField)
    }else{
      this.setFigureOnField(end, figure);
    }
    
    this.resetField(start);
    if(enemyField){
      this.resetField(enemyField);
    }
    this.resetStyles();
  }

  public setAsPossibleToMove(pos: TField): void {
    const field = this.getField(pos);
    const radioButton: HTMLInputElement = document.getElementById('possible move')! as HTMLInputElement
    if(radioButton.checked){
      field.classList.add("chessboard__field--possible_move");
    }

  }

  public setAsPossibleToAttack(pos: TField): void {
    const field = this.getField(pos);
    const radioButton: HTMLInputElement = document.getElementById('possible move')! as HTMLInputElement
    if(radioButton.checked){
      field.classList.add("chessboard__field--possible_attack");
    }
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
  public timeDisplay(time: number, color: EColor) {
    const nthChild = color === EColor.White ? 3 : 1;

    const timer = document.querySelector(
      `.stage:nth-child(${nthChild}) > .time`
    )!;
    const min = Math.floor(time / 60);
    const sec = time % 60;

    const appendZeroIfNeeded = (timeUnit: number): string =>
      ("" + timeUnit).length === 1 ? `0${timeUnit}` : timeUnit.toString();

    timer.innerHTML = `${appendZeroIfNeeded(min)}:${appendZeroIfNeeded(sec)} min`;
  }
  public getStartTime(time: number) {
    const startTime = document.querySelector(".time")!;
    startTime.innerHTML = time + "";
  }
}