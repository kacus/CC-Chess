import MenuView from "./menu";
import MovesList from "./movesList";

export default class TabsView {
  createElement(tag: string, className?: string) {
    const element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  }
  public init(parent: HTMLElement) {
    const tabContainer = this.createElement("div", "tab__container");
    const ul = this.createElement("ul", "nav");
    ul.id = "nav__tab";
    ul.addEventListener("click", this.onTabClick, false);
    const li1 = this.createElement("li");
    const a1 = this.createElement("a");
    a1.setAttribute("href", "#moves");
    a1.innerText = "Moves";
    const li2 = this.createElement("li");
    const a2 = this.createElement("a");
    a2.setAttribute("href", "#settings");
    a2.innerText = "Settings";
    const li3 = this.createElement("li", "active");
    const a3 = this.createElement("a");
    a3.setAttribute("href", "#game");
    a3.innerText = "Game";

    const movesIcon = this.createElement("img");
    movesIcon.setAttribute("src", `./static/assets/icons/moves_icon.svg`);
    li1.appendChild(movesIcon);
    const settingsIcon = this.createElement("img");
    settingsIcon.setAttribute("src", `./static/assets/icons/settings_icon.svg`);
    li2.appendChild(settingsIcon);
    const gameIcon = this.createElement("img");
    gameIcon.setAttribute("src", `./static/assets/icons/game_icon.svg`);
    li3.appendChild(gameIcon);

    const tabContent = this.createElement("div", "tab__content");
    const tabPane1 = this.createElement("div", "tab__pane");
    tabPane1.id = "moves";

    const tabPane2 = this.createElement("div", "tab__pane");
    tabPane2.id = "settings";
    const tabPane3 = this.createElement("div", "tab__pane");
    tabPane3.classList.add("active");
    tabPane3.id = "game";

    parent.appendChild(tabContainer);
    tabContainer.appendChild(ul);
    tabContainer.appendChild(tabContent);
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    li1.appendChild(a1);
    li2.appendChild(a2);
    li3.appendChild(a3);
    tabContent.appendChild(tabPane1);
    tabContent.appendChild(tabPane2);
    tabContent.appendChild(tabPane3);

    const menu = new MenuView(tabPane3);
    menu.display();

    // new MenuView(tabPane3);
  }

  public onTabClick(event: Event) {
    let activeTabs = document.querySelectorAll(".active");
    activeTabs.forEach(function (tab) {
      tab.className = tab.className.replace("active", "");
    });
    event.target.parentElement.className += " active";
    document.getElementById(event.target.href.split("#")[1])!.className +=
      " active";
  }
}
