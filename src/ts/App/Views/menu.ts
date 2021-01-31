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
    }

    // appendEl(el: HTMLElement, child1: HTMLElement, child2?: HTMLElement, child3?: HTMLElement, child4?: HTMLElement) {
    //     el.appendChild(child1);
    //     el.appendChild(child2);
    //     el.appendChild(child3);
    //     el.appendChild(child4);
    // }

    display(){
        const menu_background = this.createElement('div', 'menu_background');

        const setting_players = this.createElement('div', 'setting_players');
        setting_players.innerText = 'USTAWIENIA GRACZY';

        const players_box = this.createElement('div', 'players_box');

        const players_name = this.createElement('div', 'players_name');
        players_name.innerText = "IMIONA GRACZY";

        const first_player = this.createElement('div', 'one_player');
        first_player.innerText = 'Białe | Nazwa gracza'
        const insert_name_first = this.createElement('input', 'insert_name');
        insert_name_first.setAttribute('type', 'text');
        insert_name_first.setAttribute('maxlength', '20');
        insert_name_first.setAttribute('pattern', '[a-zA-Z0-9]{3,20}');
        first_player.appendChild(insert_name_first);

        const second_player = this.createElement('div', 'one_player');
        second_player.innerText = 'Czarne | Nazwa gracza'
        const insert_name_second = this.createElement('input', 'insert_name');
        insert_name_second.setAttribute('type', 'text');
        insert_name_second.setAttribute('maxlength', '20');
        insert_name_second.setAttribute('pattern', '[a-zA-Z0-9]{3,20}');
        second_player.appendChild(insert_name_second);

        players_box.appendChild(players_name);
        players_box.appendChild(first_player);
        players_box.appendChild(second_player);

        const form_radio = this.createElement('form', 'form_radio');
        const radio_color = this.createElement('input');
        radio_color.setAttribute('type','radio');
        radio_color.setAttribute('id','random color');
        radio_color.setAttribute('value','random color');
        const label_color = this.createElement('label');
        label_color.setAttribute('for','random color');
        label_color.innerText = 'Losowy kolor';

        const radio_move = this.createElement('input');
        radio_move.setAttribute('type','radio');
        radio_move.setAttribute('id','possible move');
        radio_color.setAttribute('value','possible move');
        const label_move = this.createElement('label');
        label_move.setAttribute('for','possible move');
        label_move.innerText = 'Pokazuj możliwe posunięcia';

        form_radio.appendChild(radio_color);
        form_radio.appendChild(label_color);
        form_radio.appendChild(radio_move);
        form_radio.appendChild(label_move);
        // this.appendEl(form_radio, radio_color, label_color, radio_move, label_move);

        const setting_box = this.createElement('div', 'setting_box');
        const setting_game = this.createElement('div', 'setting_game');
        setting_game.innerText ='USTAWIENIA GRY';

        const form_action = this.createElement('form', 'form_action');
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

        select.appendChild(option_first);
        select.appendChild(option_second);
        // this.appendEl(select, option_first, option_second)
        form_action.appendChild(select);

        const time_game = this.createElement('div', 'tame_game');
        time_game.innerText = 'CZAS GRY'
        const span_tg = this.createElement('span');
        span_tg.innerText = 'W MINUTACH';
        time_game.appendChild(span_tg);
        const slider_box = this.createElement('div', 'slider_box');
        const slider = this.createElement('input');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', '2');
        slider.setAttribute('max', '15');
        slider.setAttribute('step', '0.1');
        slider.setAttribute('value', '0');
        slider_box.appendChild(slider);

        //make slider function

        setting_box.appendChild(setting_game);
        setting_box.appendChild(form_action);
        setting_box.appendChild(time_game);
        setting_box.appendChild(slider_box);
        // this.appendEl(setting_box, setting_game, form_action, time_game, slider_box);

        const btn_box = this.createElement('div', 'btn_box');
        const btn_start = this.createElement('button', 'btn_start');
        btn_start.innerText = "ROZPOCZNIJ GRĘ";
        const btn_load = this.createElement('button', 'btn_load');
        btn_load.innerText = "WCZYTAJ GRĘ";
        btn_box.appendChild(btn_start);
        btn_box.appendChild(btn_load);
        // this.appendEl(btn_box, btn_start, btn_load);

        menu_background.appendChild(setting_players);
        menu_background.appendChild(players_box);
        menu_background.appendChild(form_radio);
        menu_background.appendChild(setting_box);
        // this.appendEl(menu_background, setting_players, players_box, form_radio, setting_box)

        const menu_wraper = this.createElement('div', 'menu_wraper');

        menu_wraper.appendChild(menu_background);
        menu_wraper.appendChild(btn_box);
        // this.appendEl(menu_wraper, menu_background, btn_box);

        this.parent.appendChild(menu_wraper);
    }

}