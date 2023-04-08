import mongoose from "mongoose";
import { config } from "./src/config/config";
import User from "./src/models/User";
import bcrypt from "bcrypt";
import request from "supertest";
import { app } from "./src/app";

const tokens: { accessToken: string; refreshToken: string } = {
  accessToken: "",
  refreshToken: "",
};

beforeAll(async () => {
  await mongoose.connect(`${config.DATABASE_HOST}:${config.DATABASE_PORT}`, {
    dbName: config.TESTING_DATABASE,
  });

  const userExists = await User.exists({ email: "john@gmail.com" });

  let email = "john@gmail.com";
  let password = "password";

  const user = new User({
    firstName: "John",
    lastName: "Doe",
    email,
    password: bcrypt.hashSync(password, Number(config.SALT) ?? 10),
  });

  await user.save();

  const response = await request(await app())
    .post("/login")
    .set("Content-Type", "application/json")
    .send({ email, password });

  const cookies = response.header["set-cookie"] as string[];

  for (let cookie of cookies) {
    if (cookie.includes("refreshToken=")) {
      tokens.refreshToken = cookie.replace("refreshToken=", "");
    } else {
      tokens.accessToken = cookie.replace("accessToken=", "");
    }
  }
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

export default tokens;
