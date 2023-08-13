import chalk from "chalk";
import Menu from "./Menu";
import Command from "./Command";
import BackCommand from "./BackCommand";
import InquirerAdaptor from "./InquirerAdaptor";
import Separator from "./Separator";

export type Choice = Menu | Command | BackCommand | Separator;

export default async function main(menu: Menu) {
  while (true) {
    await promptMenu(menu);
  }
}

async function promptMenu(menu: Menu) {
  const menuPrompt = new InquirerAdaptor(menu);
  const selection = await menuPrompt.promptUser();
  if (selection instanceof Menu) {
    await promptMenu(selection);
    return;
  }
  if (selection instanceof Command) {
    console.log(chalk.yellow.underline("\n" + selection.title));
    selection.run();
    console.log("\n");
    await promptMenu(menu);
  }
}
