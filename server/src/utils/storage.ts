import { existsSync, mkdirSync, unlinkSync, writeFileSync } from "fs";
import { join } from "path";
import { config } from "../config/config";

/**
* Store an uploaded file in the public storage directory.
* @param file An object representing the uploaded file.
* @param location The relative directory path where the file should be stored.
* @returns The relative file path if the file was stored successfully, undefined otherwise.
*/
export const publicStore = (file: undefined | Express.Multer.File, location: string): string | undefined => {

  if (file) {

    if (!existsSync(join(config.PUBLIC_STORAGE, location))) {
      mkdirSync(join(config.PUBLIC_STORAGE, location), { recursive: true })
    }

    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${file.originalname}`;
    const path = join(location, fileName);

    writeFileSync(join(config.PUBLIC_STORAGE, path), file.buffer)

    return path;
  }

  return undefined
}

/**
* Delete a file from the public storage directory.
* @param location The relative file path of the file to delete.
* @returns True if the file was deleted successfully or doesn't exist, false otherwise.
*/
export const publicDestroy = (location: string) => {

  try {
    unlinkSync(join(config.PUBLIC_STORAGE, location))
    return true;
  } catch (err) {
    return true
  }

}

