import { faker } from '@faker-js/faker/locale/en'
import { IUser } from '../../interfaces/User'

export default class UserFactory {
  public definition(): IUser {
    return {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: '$2b$10$yMyEEGz4P6ScAzlJHCh6yeiHhliD9UGeAIn9/D4BGaKU4jguFnGpS',
      address: faker.address.street(),
      phone: faker.phone.number(),
      gender: Math.floor(Math.random() * 10) + 1 > 5 ? 'M' : 'F',
      birthDay: faker.date.birthdate(),
      isAdmin: false,
      verifiedAt: new Date(),
    }
  }
}
