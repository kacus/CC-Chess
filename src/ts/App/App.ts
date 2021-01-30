import BoardModel from './Models/boardModel';
import { Field } from './Models/figureInterface';
import BoardView from './Views/boardView';

export default function App(debug: boolean = false): void {
    if (debug) console.log('Start Chess App...');
    const boardModel = new BoardModel();
    const boardView = new BoardView();
    const root = document.getElementById('root');

    boardView.init(root, boardModel);
}