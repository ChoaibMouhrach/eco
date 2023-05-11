import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { ICommand } from "../interfaces/interfaces";
import { Command } from "../packages";
import { join } from "path";
import { Ash } from "../Ash";
import Logger from "../utils/Logger";
import { AshException } from "../Exceptions";

export class MakeCommand extends Command implements ICommand {

  public dict = {
    "make:seeder": this.seeder.bind(this),
    "make:model": this.model.bind(this),
    "make:controller": this.controller.bind(this)
  };

  private createDir(path: string) {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true })
    }
  }

  private readStubContent(name: string, changes: Record<string, string | boolean | number> = {}): string {
    let content = readFileSync(join(__dirname, `../stubs/${name}.stub`), "utf8");

    Object.entries(changes).forEach(([key, value]) => {
      content = content.replaceAll(new RegExp(`{{ ${key} }}`, "ig"), String(value))
    })

    return content
  }

  private async controller() {

    // controllers directory path
    let controllersPath = Ash.config.CONTROLLERS_DIR ?? join(Ash.config.ROOT_DIR, "src/controllers")

    // create the directory
    this.createDir(controllersPath)

    // Controller name
    const controllerName = this.actions[1].toLowerCase()

    // controller path
    const controllerPath = join(controllersPath, `${controllerName}.controller.ts`);

    // file already exists
    if (existsSync(controllerPath)) {
      throw new AshException("Controller exists", `${controllerPath} exists`)
    }

    // retrieve controller from the stub
    const controllerContent = this.readStubContent("controller");

    // create controller
    writeFileSync(controllerPath, controllerContent);

    // log success message
    Logger.success("Controller created")
  }

  private async model() {

    // models path : user defined path or ROOT_DIR/src/models
    let modelsPath: string = Ash.config.MODELS_DIR ?? join(Ash.config.ROOT_DIR, "src/models");

    this.createDir(modelsPath)

    // model name
    let modelName: string = this.actions[1].toLowerCase()

    // model Path
    let modelPath: string = join(modelsPath, `${modelName.charAt(0).toUpperCase() + modelName.slice(1)}.ts`);

    if (existsSync(modelPath)) {
      throw new AshException("Model exists", `${modelPath} does exists`)
    }

    // get model content
    let modelContent = this.readStubContent("model", {
      modelName,
      model: modelName.charAt(0).toUpperCase() + modelName.slice(1)
    });

    // write file
    writeFileSync(modelPath, modelContent, "utf8");

    // log success
    Logger.success("Model Created successfully")
  };

  // handle creating seeders
  private async seeder() {

    // seeders directory path
    let seedersPath = join(Ash.config.DB_DIR, "seeders")

    // create directory
    this.createDir(seedersPath)

    // seeder Name
    let seederName = this.actions[1].toLowerCase().replace("seeder", "");

    // seeder path
    let seederPath = join(seedersPath, `${seederName}.seeder.ts`);

    // check if seeder exists
    if (existsSync(seederPath)) {
      throw new AshException("File already exists", `${seederPath} already exists`)
    }

    // read the file
    let seeder = this.readStubContent("seeder", {
      seeder: seederName.charAt(0).toUpperCase() + seederName.slice(1)
    })

    // store the file
    writeFileSync(seederPath, seeder, "utf8")

    // log success
    Logger.success(`${seederName}.seeder.ts created Successfully`)
  }

  public async run(): Promise<void> {
    const command = this.actions[0] as keyof typeof this.dict;
    await this.dict[command]()
  }

}
