import { ISeeder } from "../interfaces/interfaces.public";
import Logger from "../utils/Logger";

export abstract class Seeder implements ISeeder {

  public abstract run(): void | Promise<void>;

  public async execute() {
  
    const timeStart = process.hrtime();

    await this.run();

    let seederName = this.constructor.name;
    Logger.history(seederName, "success", Math.round(process.hrtime(timeStart)[1] / 1000000))
  }

}
