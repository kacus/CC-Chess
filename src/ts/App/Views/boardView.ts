import IBoard from '../Models/boardInterface';
import { Color, FigureType, IFigure } from '../Models/figureInterface';

export default class BoardView {

    init(parent: HTMLElement, boardModel: IBoard): void {
        const board = document.createElement('div');
        board.classList.add('chessboard');

        boardModel.board.forEach(row => {
            row.forEach(figure => {
                const field = document.createElement('div');
                field.classList.add('chessboard__field');
                if (figure) {
                    const figureImage = this.getFigureImage(figure);
                    field.appendChild(figureImage);
                    
                }
                board.appendChild(field);
            })
        })
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
}