import Logger from '../utils/Logger';

export class AshException extends Error {
  public title: string;

  public constructor(title: string, message: string) {
    super();
    this.title = title;
    this.message = message;
  }

  public display() {
    Logger.error(this.title);
    Logger.log(this.constructor.name);

    Logger.error('Message');
    Logger.log(this.message ?? 'not');

    Logger.error('Stack');
    Logger.log(String(this.stack));

    console.log();
  }
}
