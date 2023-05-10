import { Logger } from '../Logger'

export abstract class Seeder {
  public abstract run(): Promise<void>

  public readonly execute = async () => {
    try {
      let id = process.hrtime()
      await this.run()
      Logger.log(`${this.constructor.name}`, 'success', Math.ceil(process.hrtime(id)[1] / 1000000))
    } catch (err) {
      Logger.log(this.constructor.name, 'failed')
      console.log(err)
      process.exit()
    }
  }
}
