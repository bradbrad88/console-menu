import type { Choice } from "./index";
export default class Menu {
    private title;
    private parentMenu?;
    private choices;
    constructor(title: string, parentMenu?: Menu | undefined);
    getTitle(): string;
    getChoices(transformer?: (choices: Choice[]) => any): any;
    getValue(): this;
    addMenuItems(choice: Choice | Choice[]): this;
    private setParent;
}
