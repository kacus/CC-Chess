import BoardController from "./Controllers/boardController";

export default function App(): void {
    if (+process.env.DEBUG!) console.log('Start Chess App...');
    const root = document.getElementById('root')!;

    const controller = new BoardController(root);
    const revert_btn = document.createElement('button');
    revert_btn.addEventListener('click', controller.undoMove);
    revert_btn.addEventListener('click', (e)=>{
        const lastRecord = document.getElementById('moves')?.lastChild;
        console.log(lastRecord)
        if(lastRecord){
            lastRecord.remove()
        }
    })
    revert_btn.innerHTML = 'Cofnij ostatni ruch';
    revert_btn.classList.add('revert__button');

    const element =  document.getElementById('undo__button')!;
    element.appendChild(revert_btn);

    controller.addEventListenerToButton();
}