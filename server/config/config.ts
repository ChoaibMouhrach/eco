import { dirname } from "path";
import connectDB from "./database";

export const CONSTANTS = {
  ROOT_DIR: dirname(__dirname)
}

export default async function config() {
  await connectDB();
}
