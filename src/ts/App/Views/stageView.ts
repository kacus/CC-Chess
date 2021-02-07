import {  EColor, EFigureType, IFigure } from '../Models/pieces/figureInterface';

type FigureImage = {
    color: EColor;
    name: EFigureType;
}

export default class StageView{
    public init(parent: HTMLElement, color:EColor, player:string){
        const playerName = document.createElement('div');
        const time = document.createElement('div');
        time.classList.add('time');
        const figures = document.createElement('div');
        const game = document.createElement('div');
        game.classList.add('game__stage');
        figures.classList.add('figures__list');

        for(let i=0; i<8; i++){
            const pawn = document.createElement('div');
            let name = EFigureType.Pawn;
            let figure:FigureImage = {color, name};
            const figureImage = this.getFigureImage(figure)
            figureImage.classList.add('pawn');
            figures.appendChild(figureImage);

        }

        for(let i=0; i<2; i++){
            const bishop = document.createElement('div');
            let name = EFigureType.Bishop;
            let figure:FigureImage = {color, name};
            const figureImage = this.getFigureImage(figure);
            figureImage.classList.add('bishop');
            figures.appendChild(figureImage);
        }

        for(let i=0; i<2; i++){
            const knight = document.createElement('div');
            let name = EFigureType.Knight;
            let figure:FigureImage = {color, name};
            const figureImage = this.getFigureImage(figure);
            figureImage.classList.add('knight');
            figures.appendChild(figureImage);
        }

        for(let i=0; i<2; i++){
            const rook = document.createElement('div');
            let name = EFigureType.Rook;
            let figure:FigureImage = {color, name};
            const figureImage = this.getFigureImage(figure);
            figureImage.classList.add('rook');
            figures.appendChild(figureImage);
        }

        const queen = document.createElement('div');
        let name = EFigureType.Queen;
        let figure:FigureImage = {color, name};
        const figureImage = this.getFigureImage(figure);
        figureImage.classList.add('queen');
        figures.appendChild(figureImage);


        playerName.classList.add('player__name');
        playerName.innerText=player;
        parent.appendChild(game);
        game.appendChild(playerName);
        game.appendChild(figures);
        parent.appendChild(time);

    }




    private getFigureImage(figure: FigureImage): HTMLElement {
        const figureImg = document.createElement('img');

        //

        //

        //Map figure to file name
        const file = figure.color + figure.name;

        figureImg.setAttribute('src', `./static/assets/pieces/kosal/${file}.svg`);
        figureImg.setAttribute('alt', `${figure.color} ${figure.name}`);

        figureImg.classList.add('chessboard__figure__stage');

        return figureImg;
    }



}