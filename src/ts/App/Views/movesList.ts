import MovesInterface from "./movesInterface";

export default class MovesList implements MovesInterface {
  public init(lastMove: string) {
    const movesTab = document.getElementById("moves")!;
    const info = document.createElement("div");
    movesTab.appendChild(info);
    info.classList.add("info");
    info.innerHTML = lastMove;

    const countChildren = document.querySelector("#moves")!.childElementCount;
    if (countChildren > 7) {
      const firstChild = document.querySelector("#moves> .info:first-child")!;
      firstChild.remove();
    }
  }
}
