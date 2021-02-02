export default interface IMenu {
    parent: HTMLElement;
    createElement(tag: string, className?: string);
    createMenuWraper(element: HTMLElement);
    createMenuBackground(element: HTMLElement);
    createBtnBox(element: HTMLElement);
    createPlayersBox(element: HTMLElement);
    createRadio(element: HTMLElement);
    createSettingBox(element: HTMLElement);
    createSettingGame(element: HTMLElement)
    createTimeGame(element: HTMLElement);
    createAddEventListner();
    addTime();
    display();
};