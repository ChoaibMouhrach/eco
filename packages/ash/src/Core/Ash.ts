import { CommandInstance } from "../interfaces";
import { IConfig } from "../interfaces.public";
import * as Commands from "./Commands/index"
import { AshException, CommandNotFound } from "./Exceptions";

export class Ash {

  public static config: IConfig;
  public args: string[];
  public actions: string[] = [];
  public options: string[] = [];
  public flags: string[] = [];

  public constructor(config: IConfig, args: string[]) {
    Ash.config = config;
    this.args = args

    this.distribute();
  }

  private distribute() {
    for (let arg of this.args.slice(2)) {

      if (arg.includes("--")) {
        this.options.push(arg)
        continue
      }

      if (arg.includes("-")) {
        this.flags.push(arg);
        continue
      }

      this.actions.push(arg)
    }
  }

  private getCommand(): CommandInstance | null {
    let TargetedCommand: CommandInstance | null = null;

    for (let Command of Object.values(Commands)) {
      if (Command.commands.includes(this.actions[0])) {
        TargetedCommand = Command;
        break;
      }
    }

    return TargetedCommand
  }

  public async execute() {
    if (!this.actions.length) {
      throw new CommandNotFound()
    }

    const Command: CommandInstance | null = this.getCommand();

    if (Command) {
      const command = new Command();
      await command.execute({ actions: this.actions, options: this.options, flags: this.flags })
      return;
    }

    throw new CommandNotFound()
  }

  public async run() {

    try {

      await this.execute()

    } catch (err) {

      if (err instanceof AshException) {
        err.display()
        return
      }

      console.log(err)
    }

  }
}
