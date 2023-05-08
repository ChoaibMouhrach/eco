import { Request } from 'express'

/* This function is used to convert objects with string values to objects with the apropriate type */
export const parseObject = (request: Request): Record<string, any> => {
  const body: Record<string, any> = {}

  Object.entries(request.body).forEach(([key, value]: (string | any)[]) => {
    try {
      body[key] = JSON.parse(value)
    } catch (err) {
      body[key] = value
    }
  })

  return body
}
