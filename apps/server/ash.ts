import { Ash, IConfig } from "ash";
import { config } from "./src/config/config"
import { join } from "path"

const ROOT_DIR: string = __dirname;

const ashConfig: IConfig = {
  ROOT_DIR,
  DB_DIR: join(ROOT_DIR, "src/database"),
  DB_NAME: config.DATABASE_NAME,
  DB_HOST: config.DATABASE_HOST,
  DB_PORT: config.DATABASE_PORT
}

const ash = new Ash(ashConfig, process.argv);

ash.run();
