import { connect } from "mongoose"

export default async function connectDB() {

  if (!process.env.DATABASE_HOST || !process.env.DATABASE_PORT || !process.env.DATABASE_NAME) {
    throw new Error("DATABASE HOST or DATABASE or DATABASE NAME PORT")
  }

  await connect(`${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}`, { dbName: process.env.DATABASE_NAME })

  console.log(`The Database is connected on port ${process.env.DATABASE_PORT}`)

}
