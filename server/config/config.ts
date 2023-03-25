import connectDB from "./database";

export default async function config() {

  await connectDB();

}
