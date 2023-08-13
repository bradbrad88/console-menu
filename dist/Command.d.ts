export default class Command {
    title: string;
    run: () => void;
    constructor(title: string, run: () => void);
}
