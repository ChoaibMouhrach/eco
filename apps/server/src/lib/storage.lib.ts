import { v4 as uuidv4 } from "uuid";
import { join } from "path";
import multer = require("multer");
import { mkdirSync, writeFileSync } from "fs";
import { fileExistsSync } from "tsconfig-paths/lib/filesystem";
import config from "@src/config/config";

export const upload = multer({ storage: multer.memoryStorage() });

/**
 * use to store files inside storage directory
 */
export const storeFile = (name: string, buffer: Buffer): string => {
  const timestamp = Date.now();
  const randomString = uuidv4();

  const directoryPath = "storage/images";

  const fullDirectoryPath = join(config.ROOT_DIR, directoryPath);

  if (!fileExistsSync(fullDirectoryPath)) {
    mkdirSync(fullDirectoryPath, { recursive: true });
  }

  const path = join(directoryPath, `${timestamp}-${randomString}-${name}`);

  writeFileSync(join(config.ROOT_DIR, path), buffer);

  return path;
};

/**
 * use to destroy files inside storage directory
 */
export const destroy = () => { };
