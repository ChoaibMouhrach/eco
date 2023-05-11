import mongoose from 'mongoose';
import { Ash } from '../Ash';
import { ICommand } from '../interfaces/interfaces';
import { Command } from '../packages';
import { readdirSync, existsSync } from 'fs';
import { join } from 'path';
import { ISeeder } from '../interfaces/interfaces.public';
import Logger from '../utils/Logger';
import { AshException } from '../Exceptions';

export class DBCommand extends Command implements ICommand {
  public dict = {
    'db:seed': this.seed,
    'db:drop': this.drop,
  };

  public async seed() {

    const seedersPath: string = join(Ash.config.DB_DIR, 'seeders');

    if (!existsSync(seedersPath)) {
      throw new AshException("Seeders Path does not exists", "The path for seeders Directory does not exists. make sure to create the folders first")
    }

    const seedersNames = readdirSync(seedersPath);

    Logger.info("Seeding")

    let seeders = new Set();

    for (const seederName of seedersNames) {
      const Seeder = require(join(seedersPath, seederName)).default as new () => ISeeder;
      const seeder = new Seeder();
      seeders.add(seeder.execute())
    }

    await Promise.all(seeders)

    console.log()
  }

  public async drop() {
    await mongoose.connection.db.dropDatabase();
  }

  public async run() {
    // connect database
    await mongoose.connect(`${Ash.config.DB_HOST}:${Ash.config.DB_PORT}`, {
      dbName: Ash.config.DB_NAME,
    });

    // execute the command
    const command = this.actions[0] as keyof typeof this.dict;
    await this.dict[command]();
  }
}
