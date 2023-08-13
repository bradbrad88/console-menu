import Menu from "./Menu";
import Command from "./Command";
import BackCommand from "./BackCommand";
import Separator from "./Separator";
export declare type Choice = Menu | Command | BackCommand | Separator;
export default function main(menu: Menu): Promise<void>;
