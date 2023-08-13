import select, { Separator as InqSeparator } from "@inquirer/select";
import Menu from "./Menu";
import Command from "./Command";
import Separator from "./Separator";
import BackCommand from "./BackCommand";

import type { Choice } from "./index";

type Prompt = Parameters<typeof select>[0];

export default class InquirerAdaptor {
  public prompt: Prompt;
  constructor(menu: Menu) {
    this.prompt = {
      message: menu.getTitle(),
      choices: menu.getChoices(choicesTransformer),
    };
  }

  public async promptUser() {
    const res = await select(this.prompt, { clearPromptOnDone: true });
    return res;
  }
}

function choicesTransformer(choices: Choice[]) {
  return choices.map(choiceTransformer);
}

function choiceTransformer(choice: Choice): { name: string; value: Choice } | InqSeparator {
  if (choice instanceof Menu || choice instanceof BackCommand) {
    return {
      name: choice.getTitle(),
      value: choice,
    };
  }
  if (choice instanceof Command)
    return {
      name: choice.title,
      value: choice,
    };
  if (choice instanceof Separator) {
    return new InqSeparator();
  }
  return choice as any;
}
