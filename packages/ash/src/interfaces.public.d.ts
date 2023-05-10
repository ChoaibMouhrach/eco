export interface IConfig {
  ROOT_DIR: string
  DB_DIR: string
  DB_HOST: string
  DB_NAME: string
  DB_PORT: string
}

export interface IFactory {
  definition: (...args: any[]) => any
}

export interface ISeeder {
  readonly execute: () => Promise<void>
  run: () => Promise<void>
}
