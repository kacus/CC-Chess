import IBoard from '../Models/boardInterface';
import { Color, Field, FigureType, IFigure } from '../Models/figureInterface';

export default class BoardView {

    init(parent: HTMLElement, boardModel: IBoard, clickHandler: (pos: Field) => void): void {
        const board = document.createElement('div');
        board.classList.add('chessboard');

        boardModel.board.forEach((row, index_y) => {
            row.forEach((figure, index_x) => {
                const field = document.createElement('div');

                field.dataset.x = 1 + index_x + '';
                field.dataset.y = 8 - index_y + '';

                field.addEventListener('click', () => {
                    const field_pos: Field = [parseInt(field.dataset.x), parseInt(field.dataset.y)];
                    clickHandler(field_pos);
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
        let file = figure.color === Color.White ? 'w' : 'b';
        switch (figure.name) {
            case FigureType.Rook:
                file += 'p';
                break;
            case FigureType.Tower:
                file += 'r';
                break;
            case FigureType.Knight:
                file += 'n';
                break;
            case FigureType.Bishop:
                file += 'b';
                break;
            case FigureType.King:
                file += 'k';
                break;
            case FigureType.Queen:
                file += 'q';
                break;
        }

        figureImg.setAttribute('src', `./static/assets/pieces/kosal/${file}.svg`);
        figureImg.setAttribute('alt', `${figure.color} ${figure.name}`);

        figureImg.classList.add('chessboard__figure');

        return figureImg;
    }

    private resetField(pos: Field): void {
        const field = this.getField(pos);
        field.innerHTML = '';
        field.classList.value = '';
        field.classList.add('chessboard__field');
    }

    private setFigureOnField(pos: Field, figure: IFigure): void {
        const field = this.getField(pos);
        const figureImage = this.getFigureImage(figure);
        field.innerHTML = '';
        field.appendChild(figureImage);
    }

    getField(pos: Field): Element {
        const field = document.querySelector(`[data-x="${pos[0]}"][data-y="${pos[1]}"]`);

        return field;
    }

    move(start: Field, end: Field, figure: IFigure):void{
        this.setFigureOnField(end, figure);
        this.resetField(start);
        this.resetStyles();
    }


    setAsPossibleToMove(pos: Field): void {
        const field = this.getField(pos);
        field.classList.add('chessboard__field--possible_move');
    }

    setAsPossibleToAttack(pos: Field): void {
        const field = this.getField(pos);
        field.classList.add('chessboard__field--possible_attack');
    }

    setAsSelected(pos: Field): void {
        const field = this.getField(pos);
        field.classList.add('chessboard__field--selected');
    }

    resetStyles() {
        const fields = document.querySelectorAll('.chessboard__field');
        fields.forEach(field => {
            field.classList.value = '';
            field.classList.add('chessboard__field');
        })
    }
}