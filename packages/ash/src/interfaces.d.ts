import { ISeeder } from "./interfaces.public"

export interface ICommand {
  public execute: (param: { actions: string[], options: string[], flags: string[] }) => void | Promise<void>
}

export type Command = new () => ICommand
export type Seeder = new () => ISeeder
