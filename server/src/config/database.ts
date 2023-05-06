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
      password: bcrypt.hashSync("password", Number(config.SALT)),
      isAdmin: true,
      verifiedAt: new Date(),
      address: "address54646513",
      phone: "+1000000",
      birthDay: new Date(),
      gender: "F"
    });
    await user.save();
  }
}
