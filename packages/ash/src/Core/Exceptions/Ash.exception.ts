export class AshException extends Error {

  public message: string;
  public description: string;

  public constructor(message: string, description: string) {
    super();
    this.message = message;
    this.description = description;
  }

  public display() {
    console.log(this.constructor.name);
    console.log(this.message);
    console.log(this.description)
  }

}
