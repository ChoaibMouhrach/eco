import { connect } from "mongoose"
import User from "../models/User"
import bcrypt from "bcrypt"

export default async function connectDB() {

  if (!process.env.DATABASE_HOST || !process.env.DATABASE_PORT || !process.env.DATABASE_NAME) {
    throw new Error("DATABASE HOST or DATABASE or DATABASE NAME PORT")
  }

  await connect(`${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`, { dbName: process.env.DATABASE_NAME })

  if (!await User.findOne({ email: "jhon@gmail.com" })) {
    const user = new User({
      firstName: "jhon",
      lastName: "doe",
      email: "jhon@gmail.com",
      password: bcrypt.hashSync("password", Number(process.env.SALT) ?? 10)
    })

    await user.save()
  }

  if (process.env.ENV !== "testing") {
    console.log(`The Database is connected on port ${process.env.DATABASE_PORT}`)
  }
}
