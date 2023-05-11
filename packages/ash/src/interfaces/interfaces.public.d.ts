export interface Config {

  // PATHS
  ROOT_DIR: string;
  DB_DIR: string;
  MODELS_DIR?: string;
  CONTROLLERS_DIR?: string;

  // DATABASE
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASS: string;
};

export interface ISeeder {
  readonly execute: () => Promise<void>;
  public run: () => Promise<void> | void;
}
