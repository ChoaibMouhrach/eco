export type ResponseError<T> = {
  data: {
    message?: string
    errors: { path: T[]; message: string }[]
  }
  status: number
}
