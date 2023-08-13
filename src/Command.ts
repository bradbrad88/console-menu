export default class Command {
  constructor(public title: string, public run: () => void) {}
}
