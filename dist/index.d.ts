import inquirer from "inquirer";
export declare type Menu = {
    type: "menu";
    title: string;
    choices: Choice[];
    parentMenu?: Menu;
};
export declare type Command = {
    type: "command";
    title: string;
    command: () => void;
};
declare type Choice = Menu | Command | inquirer.Separator;
export default function main(menu: Menu): Promise<void>;
export {};
