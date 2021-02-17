import MovesInterface from "./movesInterface";

export default class MovesList implements MovesInterface {
  public init(lastMove: string) {
    const movesTab = document.getElementById("last__move__info")!;
    const info = document.createElement("div");
    movesTab.appendChild(info);
    info.classList.add("info");
    info.innerHTML = lastMove;

    const countChildren = document.querySelector("#last__move__info")!.childElementCount;
    if (countChildren > 6) {
      const firstChild = document.querySelector("#last__move__info> .info:first-child")!;
      firstChild.remove();
    }
  }
}
