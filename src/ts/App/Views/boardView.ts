import IBoard from '../Models/boardInterface';
import BoardModel from '../Models/boardModel';
import { EColor, TField, EFigureType, IFigure } from '../Models/pieces/figureInterface';
import TabsView from './tabsView';

export default class BoardView {

    public init(parent: HTMLElement, clickHandler: (pos: TField) => void): void {
        const board = document.createElement('div');
        board.classList.add('chessboard');

        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                const field = document.createElement('div');

                field.dataset.x = 1 + x + '';
                field.dataset.y = 8 - y + '';

                field.addEventListener('click', () => {
                    const fieldPos: TField = [parseInt(field.dataset.x!), parseInt(field.dataset.y!)];
                    clickHandler(fieldPos);
                })

                field.classList.add('chessboard__field');

                board.appendChild(field);
            }
        }

        const container = document.createElement("div");
        container.classList.add('container');
        const gamePanel = document.createElement('div');
        gamePanel.classList.add('game__panel');
        parent.appendChild(container);
        container.appendChild(gamePanel);
        gamePanel.appendChild(board);
        const settingsPanel = document.createElement('div');
        settingsPanel.classList.add('settings__panel');
        container.appendChild(settingsPanel);
        const tabs = new TabsView;
        tabs.init(settingsPanel);
    }

    public setUpBoard(board: IBoard): void {
        for (let y = 1; y <= 8; y++) {
            for (let x = 1; x <= 8; x++) {
                const pos: TField = [x, y];
                const figure = board.get(pos);
                const field = this.getField(pos);
                this.resetField(pos);
                if (figure) {
                    const figureImage = this.getFigureImage(figure);
                    field.appendChild(figureImage);
                }
            }
        }
    }

    private getFigureImage(figure: IFigure): HTMLElement {
        const figureImg = document.createElement('img');

        //Map figure to file name
        const file = figure.color + figure.name;

        figureImg.setAttribute('src', `./static/assets/pieces/kosal/${file}.svg`);
        figureImg.setAttribute('alt', `${figure.color} ${figure.name}`);

        figureImg.classList.add('chessboard__figure');

        return figureImg;
    }

    private resetField(pos: TField): void {
        const field = this.getField(pos);
        field.innerHTML = '';
        field.classList.value = '';
        field.classList.add('chessboard__field');
    }

    public setFigureOnField(pos: TField, figure: IFigure): void {
        const field = this.getField(pos);
        const figureImage = this.getFigureImage(figure);
        field.innerHTML = '';
        field.appendChild(figureImage);
    }

    public getField(pos: TField): Element {
        const field = document.querySelector(`[data-x="${pos[0]}"][data-y="${pos[1]}"]`)!;

        return field;
    }

    public move(start: TField, end: TField, figure: IFigure): void {
        this.setFigureOnField(end, figure);
        this.resetField(start);
        this.resetStyles();
    }

    public setAsPossibleToMove(pos: TField): void {
        const field = this.getField(pos);
        field.classList.add('chessboard__field--possible_move');
    }

    public setAsPossibleToAttack(pos: TField): void {
        const field = this.getField(pos);
        field.classList.add('chessboard__field--possible_attack');
    }

    public setAsSelected(pos: TField): void {
        const field = this.getField(pos);
        field.classList.add('chessboard__field--selected');
    }

    public resetStyles() {
        const fields = document.querySelectorAll('.chessboard__field');
        fields.forEach(field => {
            field.classList.value = '';
            field.classList.add('chessboard__field');
        })
    }
}