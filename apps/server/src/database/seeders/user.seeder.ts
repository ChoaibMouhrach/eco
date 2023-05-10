import { ISeeder, Seeder } from 'ash'
import UserFactory from '../factories/user.factory'
import { IUser } from '../../interfaces/User'
import User from '../../models/User'

export default class UserSeeder extends Seeder implements ISeeder {
  public async run() {
    const factory = new UserFactory()
    const definitions: Promise<IUser>[] = []

    for (let i = 0; i < 100; i++) {
      definitions.push(new Promise((res) => res(factory.definition())))
    }

    await User.insertMany(await Promise.all(definitions))
  }
}
