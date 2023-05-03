import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server"
import { join } from "path"
import { config } from "../src/config/config";
import { rmSync } from "fs";

const mongodb = new MongoMemoryServer({
  binary: {
    version: '4.0.3',
  },
});

beforeAll((done) => {

  rmSync(join(config.ROOT_DIR, "storage"), { recursive: true, force: true })

  jest.setTimeout(90 * 1000)

  mongodb.start().then(() => {

    mongoose.connect(mongodb.getUri())
      .catch(err => console.log("Connection failed", err))
      .then(() => done())

  })
})

afterAll(async () => {

  rmSync(join(config.ROOT_DIR, "storage"), { recursive: true, force: true })

  await mongoose?.connection?.db?.dropDatabase();
  await mongodb.stop();
  jest.clearAllMocks();
  jest.setTimeout(10 * 1000);
});


