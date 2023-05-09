export abstract class Seeder {

  public abstract run(): Promise<void>;

  public readonly execute = async () => {
    await this.run()
    console.log(`${this.constructor.name} seeded`);
  }

}
