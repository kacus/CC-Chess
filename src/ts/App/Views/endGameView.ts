import IEndGame from "./endGameInterface";

export default class EndGame implements IEndGame {
    parent: HTMLElement;
    constructor(parent: HTMLElement) {
        this.parent = parent;
    };

    createElement(tag: string, className?: string) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    };

    createWiner(winerColor: string){
        const div_btn = this.createElement('div', 'buttonBox');
        const box_reset = this.createElement('button', 'buttonBox__reset');
        box_reset.setAttribute('id', 'buttonBox__reset');
        const box_text = this.createElement('div', 'buttonBox__text');
        box_text.innerText = `The winer is: ${winerColor}!`;
        const box_text_reset = this.createElement('button', 'buttonBox__text--reset');
        box_text_reset.innerText = "PLAY AGAIN";
        box_text_reset.setAttribute('id', 'buttonBox__text--reset');

        box_text.appendChild(box_text_reset);
        div_btn.appendChild(box_reset);
        this.parent.append(div_btn, box_text);

        this.createBtnListener();
    };

    private createBtnListener(){
        const btn_reset = document.getElementById('buttonBox__reset');
        const btn_text_reset = document.getElementById('buttonBox__text--reset');
        btn_reset?.addEventListener('click', () => {
            location.reload();
        });
        btn_text_reset?.addEventListener('click', () => {
            location.reload();
        });
    };

}