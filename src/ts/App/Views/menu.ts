import IMenu from './menuInterface';
export default class MenuView implements IMenu {
    parent: HTMLElement;
    constructor(parent: HTMLElement) {
        this.parent = parent;
    };

    createElement(tag: string, className?: string) {
        const element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    };

    private createMenuWraper(element: HTMLElement){
        const menu_wraper = this.createElement('div', 'menu');
        this.createMenuBackground(menu_wraper);
        this.createBtnBox(menu_wraper);
        element.appendChild(menu_wraper);
    };
       
    private createMenuBackground(element: HTMLElement){
        const menu_background = this.createElement('div', 'menu__background');
        this.createSettingPlayers(menu_background);
        this.createSettingBox(menu_background);
        element.appendChild(menu_background);
    };

    private createBtnBox(element: HTMLElement){
        const btn_box = this.createElement('div', 'menu__button');
        const btn_start = this.createElement('button', 'menu__button--start');
        btn_start.innerText = "ROZPOCZNIJ GRĘ";
        btn_box.append(btn_start);
        element.appendChild(btn_box);
    };

    private createSettingPlayers(element: HTMLElement){
        const setting_players = this.createElement('div', 'setting__players');
        const setting_players_text = this.createElement('div', 'setting__players--text');
        setting_players_text.innerText = 'USTAWIENIA GRACZY';
        setting_players.appendChild(setting_players_text);
        
        const players_box = this.createElement('div', 'setting__players--box');
        const players_box_text = this.createElement('div', 'setting__players--text');
        players_box_text.innerText = "IMIONA GRACZY";
        const players = this.createElement('div', 'setting__players--players');

        const first_player = this.createElement('div', 'players--one_player');
        const white = this.createElement('div', 'white_player');
        white.innerText = 'Białe | Nazwa gracza'
        const insert_name_first = this.createElement('input', 'insert__name');
        insert_name_first.setAttribute('type', 'text');
        insert_name_first.setAttribute('maxlength', '20');
        insert_name_first.setAttribute('pattern', '[a-zA-Z0-9]{3,20}');
        first_player.append(white, insert_name_first);

        const second_player = this.createElement('div', 'players--one_player');
        const black = this.createElement('div', 'black_player');
        black.innerText = 'Czarne | Nazwa gracza'
        const insert_name_second = this.createElement('input', 'insert__name');
        insert_name_second.setAttribute('type', 'text');
        insert_name_second.setAttribute('maxlength', '20');
        insert_name_second.setAttribute('pattern', '[a-zA-Z0-9]{3,20}');
        second_player.append(black, insert_name_second);

        players.append(first_player, second_player);
        players_box.append(players_box_text, players);
        setting_players.appendChild(players_box)
        this.createRadio(setting_players);
        element.appendChild(setting_players);
    };

    private createRadio(element: HTMLElement) {
        const form_checkbox = this.createElement('form', 'setting__players--form_checkbox');

        const checkbox_color = this.createElement('input');
        checkbox_color.setAttribute('type','checkbox');
        checkbox_color.setAttribute('id','random color');
        checkbox_color.setAttribute('name','random color');

        const label_color = this.createElement('label');
        label_color.setAttribute('for','random color');
        label_color.innerText = 'Losowy kolor';

        const checkbox_move = this.createElement('input');
        checkbox_move.setAttribute('type','checkbox');
        checkbox_move.setAttribute('id','possible move');
        checkbox_move.setAttribute('name','possible move');

        const label_move = this.createElement('label');
        label_move.setAttribute('for','possible move');
        label_move.innerText = 'Pokazuj możliwe posunięcia';

        form_checkbox.append(checkbox_color, label_color, checkbox_move, label_move);
        element.appendChild(form_checkbox);
    };

    private createSettingBox(element: HTMLElement){
        const setting_box = this.createElement('div', 'setting__box');
        this.createSettingGame(setting_box);
        this.createTimeGame(setting_box);
        element.appendChild(setting_box);
    };

    private createSettingGame(element: HTMLElement){
        const setting_game = this.createElement('div', 'setting--game');
        const setting_text = this.createElement('div', 'setting__game--text');
        setting_text.innerText ='USTAWIENIA GRY';

        const form_action = this.createElement('form', 'setting__box--form__action');
        form_action.innerText = "WARIANT GRY";
        const select = this.createElement('select'); 
        select.setAttribute('name', 'game variant');
        const option_first = this.createElement('option');
        option_first.setAttribute('value', 'classic');
        option_first.setAttribute('selected', "");
        option_first.innerText ='Klasyczny';
        const option_second = this.createElement('option');
        option_second.setAttribute('value','amateur');
        option_second.innerText ='Amatorski';

        select.append(option_first, option_second);
        form_action.appendChild(select);
        setting_game.append(setting_text, form_action);
        element.appendChild(setting_game);
    };

    private createTimeGame(element: HTMLElement){
        const time_game = this.createElement('div', 'setting--tame');
        time_game.innerText = 'CZAS GRY'
        const span_tg = this.createElement('span');
        span_tg.innerText = 'W MINUTACH';
        time_game.appendChild(span_tg);

        const slider_box = this.createElement('div', 'setting--slider');
        const slider = this.createElement('input', 'slider__range');
        slider.setAttribute('type', 'range');
        slider.setAttribute('name', 'range_time');
        slider.setAttribute('min', '2');
        slider.setAttribute('max', '15');
        slider.setAttribute('step', '1');
        slider.setAttribute('value', '5');
        slider.setAttribute('id', 'range');

        const slider_time = this.createElement('output');
        slider_time.setAttribute('id', 'range_display');
        slider_time.setAttribute('name', 'range_display');
        slider_time.setAttribute('for', 'range_time');
        slider_time.textContent = `Wybrany czas gry to: ${slider.getAttribute('value')}min`
        slider_box.append(slider, slider_time);
        
        element.append(time_game, slider_box);
    };

    private createAddEventListner() {
        const t = document.getElementById('range');
        t.addEventListener("input", () => {
            this.addTime();
        });
        t.addEventListener("change", () => {
            this.addTime()
        });
    }

    private addTime() {
        const sliderValue = (<HTMLInputElement>document.getElementById('range')).value;
        const outputElement = <HTMLElement>document.getElementById('range_display');
        outputElement.innerText = `Wybrany czas gry to: ${sliderValue}min`;
    };

    display(){
        this.createMenuWraper(this.parent);
       
        this.createAddEventListner();    
    };
};