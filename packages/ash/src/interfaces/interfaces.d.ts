// Commands
export interface ICommandConstructor {
  actions: string[];
  options: string[];
  flags: string[];
}
export interface ICommand {
  readonly dict: Record<string, () => void>;

  actions: string[];
  options: string[];
  flags: string[];

  public run(): Promise<void> | void;
}
export type CCommand = new (args: ICommandConstructor) => ICommand;
