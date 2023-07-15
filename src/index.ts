import inquirer from "inquirer";
import chalk from "chalk";

export type Menu = {
  type: "menu";
  title: string;
  choices: Choice[];
  parentMenu?: Menu;
};

export type Command = {
  type: "command";
  title: string;
  command: () => void;
};

type Choice = Menu | Command | inquirer.Separator;

const exitCommand: Command = {
  type: "command",
  command: () => {
    process.exit();
  },
  title: "Exit",
};

type InquirerPrompt = {
  name: string;
  value: Command | Menu;
  prefix?: string;
};

export default async function main(menu: Menu) {
  while (true) {
    await promptMenu(menu);
  }
}

async function promptMenu(menu: Menu) {
  const prompt = inquirer.createPromptModule();
  const menuPrompt = prepareMenuPrompt(menu);
  const { menu: res } = (await prompt(menuPrompt as any)) as { menu: Command | Menu };
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

function createBackPrompt(menu: Menu): InquirerPrompt {
  return { name: "Back", value: menu, prefix: undefined };
}

function prepareMenuPrompt(menu: Menu) {
  // Give all the choices in the menu a reference to their parent menu: the menu provided to this function
  const choicesWithParentReference: Choice[] = [...menu.choices].map(choice => ({
    ...choice,
    parentMenu: menu,
  }));

  // Provide exit navigation and separator formatting for improve UX
  const rawChoices = [...choicesWithParentReference, new inquirer.Separator(), exitCommand];

  // Turn choices from our own Menu | Command object to an object that Inquirer can use: {name: string, value: any}
  const choices = rawChoices.map(prepareChoices) as InquirerPrompt[];

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

function prepareChoices(choice: Choice) {
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
