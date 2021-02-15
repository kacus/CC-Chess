import BoardController from "./Controllers/boardController";

export default function App(): void {
    if (+process.env.DEBUG!) console.log('Start Chess App...');
    const root = document.getElementById('root')!;

    const controller = new BoardController(root);
    const revert_btn = document.createElement('button');
    revert_btn.addEventListener('click', controller.undoMove);
    revert_btn.innerHTML = 'UNDO';
    revert_btn.classList.add('revert__button');
    root.appendChild(revert_btn);

    const start = document.getElementById('menu__button--start');
    start?.addEventListener('click', () => {
        controller.newGame(60)
    });

}