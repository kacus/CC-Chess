import BoardModel from '../Models/boardModel';
import { EColor, TField, EFigureType, IFigure } from '../Models/figureInterface';

export default class BoardView {

    public init(parent: HTMLElement, boardModel: BoardModel, clickHandler: (pos: TField) => void): void {
        const board = document.createElement('div');
        board.classList.add('chessboard');

        boardModel.board.forEach((row, index_y) => {
            row.forEach((figure, index_x) => {
                const field = document.createElement('div');

                field.dataset.x = 1 + index_x + '';
                field.dataset.y = 8 - index_y + '';

                field.addEventListener('click', () => {
                    const fieldPos: TField = [parseInt(field.dataset.x), parseInt(field.dataset.y)];
                    clickHandler(fieldPos);
                })

                field.classList.add('chessboard__field');
                if (figure) {
                    const figureImage = this.getFigureImage(figure);
                    field.appendChild(figureImage);

                }
                board.appendChild(field);
            });
        });
        parent.appendChild(board);
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

    private setFigureOnField(pos: TField, figure: IFigure): void {
        const field = this.getField(pos);
        const figureImage = this.getFigureImage(figure);
        field.innerHTML = '';
        field.appendChild(figureImage);
    }

    public getField(pos: TField): Element {
        const field = document.querySelector(`[data-x="${pos[0]}"][data-y="${pos[1]}"]`);

        return field;
    }

    public move(start: TField, end: TField, figure: IFigure):void{
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