import { connect } from "mongoose";
import { config } from "./config";
import User from "../models/User";
import bcrypt from "bcrypt";

export default async function connectDB() {
  await connect(`${config.DATABASE_HOST}:${config.DATABASE_PORT}`, {
    dbName: config.DATABASE_NAME,
  });

  if (!(await User.exists({ email: "admin@eco.com" }))) {
    const user = new User({
      firstName: "admin",
      lastName: "admin",
      email: "admin@eco.com",
      verifiedAt: new Date(),
      isAdmin: true,
      password: bcrypt.hashSync("password", Number(config.SALT)),
    });
    await user.save();
  }
}
