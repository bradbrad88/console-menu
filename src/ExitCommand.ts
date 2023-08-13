import Command from "./Command";

const exitCommand = new Command("Exit", () => {
  process.exit();
});

export default exitCommand;
