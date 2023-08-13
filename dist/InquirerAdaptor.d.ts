import select from "@inquirer/select";
import Menu from "./Menu";
declare type Prompt = Parameters<typeof select>[0];
export default class InquirerAdaptor {
    prompt: Prompt;
    constructor(menu: Menu);
    promptUser(): Promise<unknown>;
}
export {};
