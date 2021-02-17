export default interface IEndGame {
    parent: HTMLElement;
    
    createElement(tag: string, className?: string):HTMLElement;
    createWiner(winerColor: string): void;
};