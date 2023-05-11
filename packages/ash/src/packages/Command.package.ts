import { ICommandConstructor } from '../interfaces/interfaces';

export class Command {
  public actions: string[] = [];
  public options: string[] = [];
  public flags: string[] = [];

  public constructor({ actions, options, flags }: ICommandConstructor) {
    this.actions = actions;
    this.options = options;
    this.flags = flags;
  }
}
