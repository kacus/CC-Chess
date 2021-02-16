import BoardController from "./Controllers/boardController";

export default function App(): void {
    if (+process.env.DEBUG!) console.log('Start Chess App...');
    const root = document.getElementById('root')!;

    const controller = new BoardController(root);
    const revertBtn = document.createElement('button');
    revertBtn.addEventListener('click', controller.undoMove);
    revertBtn.addEventListener('click', (e)=>{
        const lastRecord = document.getElementById('last__move__info')?.lastChild;
        console.log(lastRecord)
        if(lastRecord){
            lastRecord.remove()
        }
    })
    revertBtn.innerHTML = 'UNDO';
    revertBtn.classList.add('revert__button');

    const element =  document.getElementById('undo__button__container')!;
    element.appendChild(revertBtn);

    const start = document.getElementById('menu__button--start');
    start?.addEventListener('click', () => {
        controller.newGame(60)
    });

    controller.addEventListenerToButton();
}