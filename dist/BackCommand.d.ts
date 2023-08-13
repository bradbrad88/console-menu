import Menu from "Menu";
export default class BackCommand {
    #private;
    private menu;
    constructor(menu: Menu);
    getTitle(): string;
    getValue(): Menu;
}
