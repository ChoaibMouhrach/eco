import { ISeeder } from './interfaces.public'

export interface ICommand {

  public flags: string[];
  public actions: string[];
  public options: string[];

  execute: () => void | Promise<void>
};

export interface ICommandConstructor {
  actions: string[];
  flags: string[];
  options: string[];
};

export type Command = new (data: ICommandConstructor) => ICommand
export type Seeder = new (actions: string[], flags: string[], options: string[]) => ISeeder
