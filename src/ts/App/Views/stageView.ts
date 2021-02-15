import { EColor, EFigureType, IFigure } from "../Models/pieces/figureInterface";

type FigureImage = {
  color: EColor;
  name: EFigureType;
};

export default class StageView {
  id: string
  constructor(id: string){
    this.id= id;
  }
  public init(parent: HTMLElement, color: EColor, player: string) {
    const playerName = document.createElement("div");
    const time = document.createElement("div");
    time.classList.add("time");
    time.innerText='00:00 min'
    const figures = document.createElement("div");
    const game = document.createElement("div");
    game.classList.add("game__stage");
    figures.classList.add("figures__list");

    this.createFigure("Pawn", 8, color, figures);
    this.createFigure("Bishop", 2, color, figures);
    this.createFigure("Knight", 2, color, figures);
    this.createFigure("Rook", 2, color, figures);
    this.createFigure("Queen", 1, color, figures);

    playerName.classList.add("player__name");
    playerName.innerText = player
    playerName.id = this.id

    parent.appendChild(game);
    game.appendChild(playerName);
    game.appendChild(figures);
    parent.appendChild(time);
  }

  private getFigureImage(figure: FigureImage): HTMLElement {
    const figureImg = document.createElement("img");

    //Map figure to file name
    const file = figure.color + figure.name;

    figureImg.setAttribute("src", `./static/assets/pieces/kosal/${file}.svg`);
    figureImg.setAttribute("alt", `${figure.color} ${figure.name}`);

    figureImg.classList.add("chessboard__figure__stage");

    return figureImg;
  }

  private createFigure(
    figureType: keyof typeof EFigureType,
    repeat: number,
    color: EColor,
    parent: HTMLDivElement
  ) {
    for (let i = 0; i < repeat; i++) {
      const name = EFigureType[figureType];
      const figure: FigureImage = { color, name };
      const figureImage = this.getFigureImage(figure);
      figureImage.classList.add(EFigureType[figureType].toLowerCase());
      parent.appendChild(figureImage);
    }
  }
}
