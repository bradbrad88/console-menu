import type { Choice } from "./index";
import exitCommand from "./ExitCommand";
import Separator from "./Separator";
import BackCommand from "./BackCommand";

export default class Menu {
  private choices: Choice[];
  constructor(private title: string, private parentMenu?: Menu) {
    this.choices = [];
  }
  getTitle() {
    return this.title;
  }
  getChoices(transformer: (choices: Choice[]) => any = choices => choices) {
    const choices = [...this.choices, new Separator()];
    if (this.parentMenu) {
      choices.push(new BackCommand(this.parentMenu));
    }
    choices.push(exitCommand);

    return transformer(choices);
  }
  getValue() {
    return this;
  }
  addMenuItems(choice: Choice | Choice[]) {
    const pushItem = (item: Choice) => {
      this.choices.push(item);
      if (item instanceof Menu) {
        item.setParent(this);
      }
    };
    const choices = Array.isArray(choice) ? choice : [choice];
    choices.forEach(choice => pushItem(choice));

    return this;
  }
  private setParent(parent: Menu) {
    this.parentMenu = parent;
  }
}
