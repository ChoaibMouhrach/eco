import { ICommand, Seeder as CSeeder } from '../../interfaces'
import { Ash } from '../Ash'
import { join } from 'path'
import { readdirSync, existsSync } from 'fs'
import mongoose from 'mongoose'
import { SeederException } from '../Exceptions'
import { Logger } from '../Logger'
import { Command } from '../packages'

export class SeederCommand extends Command implements ICommand {

  public static commands: string[] = ["seed"];

  private async connect() {
    await mongoose.connect(`${Ash.config.DB_HOST}:${Ash.config.DB_PORT}`, {
      dbName: Ash.config.DB_NAME,
    })

    await mongoose.connection.db.dropDatabase();
  }

  public async execute() {

    // seeders directory path
    const seedersPath = join(Ash.config.DB_DIR, 'seeders')

    if (!existsSync(seedersPath)) {
      throw new SeederException(
        'Seeders directory does not exists',
        'The provided path for the seeders directory does not exists',
      )
    }

    // seeders with in the seeders directory
    const seedersNames = readdirSync(seedersPath)

    // connect database
    await this.connect()

    // Promises
    const seeders: Promise<void>[] = []

    // log seeding
    Logger.title('Seeding Database')

    // loop through names
    for (let seederName of seedersNames) {

      // require seeder
      const Seeder = require(join(seedersPath, seederName)).default as CSeeder | undefined

      if (!Seeder) {
        throw new SeederException(
          'Seeder not found',
          `No seeder found within the file ${seederName}`,
        )
      }

      const seeder = new Seeder(this.actions, this.flags, this.options)

      // run the seeder
      seeders.push(seeder.execute())
    }

    // wait for all the seeders to finish
    await Promise.all(seeders)

    console.log('\n')
  }
}
