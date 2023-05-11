import chalk from "chalk";

export default class Logger {
  public static log(text: string) {
    console.log(`  ${text}  `);
  }

  public static history(message: string, state: "success" | "danger", time?: number) {

    // state
    let tag = state === "success" ? "DONE" : "FAILED";

    let duration = time !== undefined ? `${time}ms` : ""

    // dots count
    let count = process.stdout.columns - 8 - message.length - tag.length - duration.length;

    // dots
    let dots: string = "";

    for (let i = 0; i < count; i++) {
      dots += "."
    }

    Logger.log(`${message} ${dots} ${duration} ${state === "success" ? chalk.green(tag) : chalk.red(tag)}`)

  }

  public static error(text: string) {
    console.log();
    Logger.log(chalk.black.bgRed(` ${text} `));
    console.log();
  }

  public static success(text: string) {
    console.log();
    Logger.log(chalk.green(text));
    console.log();
  }

  public static info(text: string) {
    console.log();
    Logger.log(chalk.cyan(text));
    console.log();
  }
}
