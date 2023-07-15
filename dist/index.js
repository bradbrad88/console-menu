import inquirer from "inquirer";
import chalk from "chalk";
const exitCommand = {
    type: "command",
    command: () => {
        process.exit();
    },
    title: "Exit",
};
export default async function main(menu) {
    while (true) {
        await promptMenu(menu);
    }
}
async function promptMenu(menu) {
    const prompt = inquirer.createPromptModule();
    const menuPrompt = prepareMenuPrompt(menu);
    const { menu: res } = (await prompt(menuPrompt));
    console.clear();
    if (res.type === "menu") {
        await promptMenu(res);
        return;
    }
    if (res.type === "command") {
        console.log(chalk.yellow.underline("\n" + res.title));
        res.command();
        console.log("\n");
        await promptMenu(menu);
    }
}
function createBackPrompt(menu) {
    return { name: "Back", value: menu, prefix: undefined };
}
function prepareMenuPrompt(menu) {
    // Give all the choices in the menu a reference to their parent menu: the menu provided to this function
    const choicesWithParentReference = [...menu.choices].map(choice => ({
        ...choice,
        parentMenu: menu,
    }));
    // Provide exit navigation and separator formatting for improve UX
    const rawChoices = [...choicesWithParentReference, new inquirer.Separator(), exitCommand];
    // Turn choices from our own Menu | Command object to an object that Inquirer can use: {name: string, value: any}
    const choices = rawChoices.map(prepareChoices);
    // Create a back button if the menu contains a parent menu {name: "Back", value: Menu}
    if (menu.parentMenu) {
        choices.splice(-1, 0, createBackPrompt(menu.parentMenu));
    }
    const separator = chalk.magenta("---");
    return {
        name: "menu",
        type: "list",
        message: menu.title,
        choices,
        prefix: separator,
        suffix: separator,
    };
}
function prepareChoices(choice) {
    if (choice instanceof inquirer.Separator) {
        return choice;
    }
    if ("command" in choice) {
        return {
            name: choice.title,
            value: choice,
        };
    }
    return {
        name: choice.title,
        value: choice,
    };
}
