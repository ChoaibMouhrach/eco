import { config } from "../src/config/config";
import { join } from "path";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const mongodb = new MongoMemoryServer({
  binary: {
    version: "4.0.3",
  },
});

beforeAll((done) => {
  jest.setTimeout(90 * 1000);
  mongodb.start().then(() => {
    mongoose
      .connect(mongodb.getUri())
      .catch((err) => console.log("Connection failed", err))
      .then(() => done());
  });
});

afterAll(async () => {
  jest.setTimeout(90 * 1000);
  await mongoose?.connection?.db?.dropDatabase();
  await mongodb.stop();
  jest.clearAllMocks();
  jest.setTimeout(10 * 1000);
});
