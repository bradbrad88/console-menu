import Menu from "Menu";

export default class BackCommand {
  #title: string;
  constructor(private menu: Menu) {
    this.#title = "Back";
  }
  getTitle() {
    return this.#title;
  }
  getValue() {
    return this.menu;
  }
}
