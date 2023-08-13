"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ExitCommand_1 = __importDefault(require("./ExitCommand"));
const Separator_1 = __importDefault(require("./Separator"));
const BackCommand_1 = __importDefault(require("./BackCommand"));
class Menu {
    constructor(title, parentMenu) {
        this.title = title;
        this.parentMenu = parentMenu;
        this.choices = [];
    }
    getTitle() {
        return this.title;
    }
    getChoices(transformer = choices => choices) {
        const choices = [...this.choices, new Separator_1.default()];
        if (this.parentMenu) {
            choices.push(new BackCommand_1.default(this.parentMenu));
        }
        choices.push(ExitCommand_1.default);
        return transformer(choices);
    }
    getValue() {
        return this;
    }
    addMenuItems(choice) {
        const pushItem = (item) => {
            this.choices.push(item);
            if (item instanceof Menu) {
                item.setParent(this);
            }
        };
        const choices = Array.isArray(choice) ? choice : [choice];
        choices.forEach(choice => pushItem(choice));
        return this;
    }
    setParent(parent) {
        this.parentMenu = parent;
    }
}
exports.default = Menu;
