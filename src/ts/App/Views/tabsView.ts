import MenuView from "./menu";
import MovesList from "./movesList";

export default class TabsView {
  public init(parent: HTMLElement) {
    const tabContainer = this.createElement("div", "tab__container");
    parent.appendChild(tabContainer);
    this.createNavigation(tabContainer);
    this.createTabs(tabContainer);
  }
  private createElement(tag: string, className?: string) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }
  private createNavigation(tabContainer: HTMLElement) {
    const ul = this.createElement("ul", "nav");
    ul.id = "nav__tab";
    // ul.addEventListener("click", this.onTabClick, false);
    const li1 = this.createElement("li");

    li1.addEventListener('click', (e)=>{
      const tab = document.getElementById('moves');
      const activeTabs = document.querySelectorAll(".active");
      activeTabs.forEach(function (tab) {
        tab.className = tab.className.replace("active", "");
      });
      tab?.classList.add('active');
      const clickedTabs = document.querySelectorAll(".clicked");
      clickedTabs.forEach(function (clicked) {
        clicked.className = clicked.className.replace("clicked", "");
      });
      li1.classList.add('clicked')

    })

    const a1 = this.createElement("a");
    a1.setAttribute("href", "#moves");
    a1.innerText = "Moves";
    const li3 = this.createElement("li", "active");

    li3.addEventListener('click', (e)=>{
      const tab = document.getElementById('game');
      const activeTabs = document.querySelectorAll(".active");
      activeTabs.forEach(function (tab) {
        tab.className = tab.className.replace("active", "");
      });
      tab?.classList.add('active');
      const clickedTabs = document.querySelectorAll(".clicked");
      clickedTabs.forEach(function (clicked) {
        clicked.className = clicked.className.replace("clicked", "");
      });
      li3.classList.add('clicked')
    })

    const a3 = this.createElement("a");
    a3.setAttribute("href", "#game");
    a3.innerText = "Game";
    this.addIcons(li1, li3);

    tabContainer.appendChild(ul);
    ul.appendChild(li1);
    ul.appendChild(li3);
    li1.appendChild(a1);
    li3.appendChild(a3);
  }

  private createTabs(tabContainer: HTMLElement) {
    const tabContent = this.createElement("div", "tab__content");
    const tabPane1 = this.createElement("div", "tab__pane");
    tabPane1.id = "moves";
    const tabPane3 = this.createElement("div", "tab__pane");
    tabPane3.classList.add("active");
    tabPane3.id = "game";

    const lastMoveInfo= this.createElement('div', 'last__move__info');
    lastMoveInfo.id='last__move__info';
    const undoButtonContainer = this.createElement('div', 'undo__button__container');
    undoButtonContainer.id='undo__button__container';

    tabContent.appendChild(tabPane1);
    tabPane1.appendChild(lastMoveInfo);
    tabPane1.appendChild(undoButtonContainer);
    tabContent.appendChild(tabPane3);
    tabContainer.appendChild(tabContent);

    const menu = new MenuView(tabPane3);
    menu.display();
  }

  private addIcons(li1: HTMLElement,  li3: HTMLElement) {
    const movesIcon = this.createElement("img");
    movesIcon.setAttribute("src", `./static/assets/icons/moves_icon.svg`);
    li1.appendChild(movesIcon);
    const gameIcon = this.createElement("img");
    gameIcon.setAttribute("src", `./static/assets/icons/game_icon.svg`);
    li3.appendChild(gameIcon);
  }

}