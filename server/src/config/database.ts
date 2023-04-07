import { connect } from "mongoose";
import User from "../models/User";
import bcrypt from "bcrypt";
import { config } from "./config";

export default async function connectDB() {
  await connect(`${config.DATABASE_HOST}:${config.DATABASE_PORT}`, { dbName: config.DATABASE_NAME });

  if (!(await User.findOne({ email: "jhon@gmail.com" }))) {
    const user = new User({
      firstName: "john",
      lastName: "doe",
      email: "john@gmail.com",
      password: bcrypt.hashSync("password", Number(config.SALT) ?? 10),
    });

    await user.save();
  }

  if (config.ENV !== "testing") {
    console.log(`The Database is connected on port ${config.DATABASE_PORT}`);
  }
}
