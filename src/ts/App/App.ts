import BoardController from "./Controllers/boardController";


export default function App(debug: boolean = false): void {
    if (debug) console.log('Start Chess App...');
    const root = document.getElementById('root');

    const controller = new BoardController(root);
    controller.setBoard();
}