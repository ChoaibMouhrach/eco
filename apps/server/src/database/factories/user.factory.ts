import { faker } from "@faker-js/faker"
import { hashSync } from "bcrypt";
import { config } from "../../config/config";
import { IUser } from "../../interfaces/User";

export default class UserFactory {

  public definition(): IUser {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: hashSync("password", Number(config.SALT)),
      address: faker.address.street(),
      phone: faker.phone.number(),
      gender: Math.floor(Math.random() * 10) + 1 > 5 ? "M" : "F",
      birthDay: faker.date.birthdate(),
      isAdmin: false,
      verifiedAt: new Date()
    }
  }

}
