export default interface IMenu {
    parent: HTMLElement;
    
    createElement(tag: string, className?: string):HTMLElement;
    display():void;
};