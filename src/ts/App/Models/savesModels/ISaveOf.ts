import BoardView from "../../Views/boardView";
import BoardModel from "../boardModel";

export default interface ISaveOf {
    printMove(): string;
    revert(model: BoardModel, view: BoardView): void;
}