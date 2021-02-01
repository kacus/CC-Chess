import BoardController from "./Controllers/boardController";

export default function App(): void {
    if (!!process.env.DEBUG) console.log('Start Chess App...');
    const root = document.getElementById('root')!;

    const controller = new BoardController(root);
    controller.setBoard();
}