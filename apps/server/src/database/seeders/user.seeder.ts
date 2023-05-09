import { ISeeder, Seeder } from "ash"
import UserFactory from "../factories/user.factory"
import { UserDocument } from "../../interfaces/User";
import User from "../../models/User";

export default class UserSeeder extends Seeder implements ISeeder {

  public async run() {
    const userFactory = new UserFactory();
    const users: Promise<UserDocument>[] = []

    for (let i = 0; i < 100; i++) {
      users.push(
        User.create(
          userFactory.definition()
        )
      )
    }

    await Promise.all(users)
  }

}
