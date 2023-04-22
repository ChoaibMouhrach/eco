import { connect } from "mongoose";
import { config } from "./config";
import User from "../models/User";
import bcrypt from "bcrypt";

export default async function connectDB() {
  const dbName = config.ENV === "testing" ? config.TESTING_DATABASE : config.DATABASE_NAME;

  await connect(`${config.DATABASE_HOST}:${config.DATABASE_PORT}`, { dbName });

  if (!(await User.exists({ email: "admin@eco.com" }))) {
    const user = new User({
      firstName: "admin",
      lastName: "admin",
      email: "admin@eco.com",
      verifiedAt: new Date(),
      password: bcrypt.hashSync("password", Number(config.SALT)),
    });

    await user.save();
  }

  if (config.ENV !== "testing") {
    console.log(`The Database is connected on port ${config.DATABASE_PORT}`);
  }
}
