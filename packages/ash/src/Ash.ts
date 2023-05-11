import { AshException } from './Exceptions';
import { Config } from './interfaces/interfaces.public';
import * as Commands from './commands';
import { ICommand } from './interfaces/interfaces';
import Logger from './utils/Logger';
import mongoose from 'mongoose';

export class Ash {
  // config
  public static config: Config;

  // command options
  public actions: string[] = [];

  // command flags
  public flags: string[] = [];

  // command options
  public options: string[] = [];

  public constructor(config: Config, args: string[]) {
    // config setup
    Ash.config = config;
    this.distribute(args);
  }

  /**
   * distribute arguments into flags, actions and options
   * @param args : string[] command arguments
   * @returns void
   * */
  private distribute(args: string[]) {
    for (const arg of args.slice(2)) {
      if (arg.includes('--')) {
        this.options.push(arg);
        continue;
      }

      if (arg.includes('-')) {
        this.flags.push(arg);
        continue;
      }

      this.actions.push(arg);
    }
  }

  /**
   * Gets the desired command handler
   * @returns The desired Command | null
   */
  private getCommand(): ICommand | null {
    let desiredCommand: ICommand | null = null;

    for (const Command of Object.values(Commands)) {
      const command = new Command({
        actions: this.actions,
        options: this.options,
        flags: this.flags,
      });

      if (Object.keys(command.dict).includes(this.actions[0])) {
        desiredCommand = command;
        break;
      }
    }

    return desiredCommand;
  }

  /**
   * Execute The desired Command
   */
  private async execute(): Promise<void> {
    const command = this.getCommand();

    if (!command) {
      throw new AshException('Command not found', 'The provided command does not exists');
    }

    await command.run();
  }

  public async run(): Promise<void> {
    try {
      await this.execute();
    } catch (err) {
      if (err instanceof AshException) {
        err.display();
        return;
      }

      Logger.error('Error');
      console.log(err)
    } finally {
      // close database connection
      mongoose.connection?.close();
    }
  }
}
