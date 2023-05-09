import { AshException } from "./Ash.exception";

export class CommandNotFound extends AshException {
  public constructor() {
    super("Command does not exists", "The command you provided does not exists with in our CLI")
  }
}
