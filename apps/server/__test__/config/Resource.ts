export abstract class Resource<TCreate, TModel> {
  public data: TCreate;

  public instance: TModel | null = null;

  public constructor(data: TCreate) {
    this.data = data;
  }

  public getData() {
    return this.data;
  }

  public abstract createDB(): Promise<TModel>;
  public abstract checkDB(): Promise<null | TModel>;
  public abstract destroy(): Promise<void>;
}
