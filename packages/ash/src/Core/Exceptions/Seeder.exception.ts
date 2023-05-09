import { AshException } from "./Ash.exception";

export class SeederException extends AshException {
  public constructor(message: string, description: string) {
    super(message, description)
  }
}
