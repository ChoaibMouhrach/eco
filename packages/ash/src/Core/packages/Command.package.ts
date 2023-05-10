import { ICommandConstructor } from "../../interfaces";

export class Command {

  public actions: string[] = [];
  public flags: string[] = [];
  public options: string[] = []

  constructor({ actions, flags, options }: ICommandConstructor) {
    this.actions = actions;
    this.flags = flags;
    this.options = options
  }

}
