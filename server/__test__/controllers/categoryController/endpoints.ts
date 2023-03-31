import request from "supertest"
import { app } from "../../../app"
import { generateUrl } from "../../../helpers/testingHelper"

export const index = async ({ sort, fields, order, search }: { sort?: string, fields?: string, order?: string, search?: string }) => {
  let url: string = generateUrl({ baseUrl: "/categories", sort, fields, order, search });
  return await request(await app()).get(url).set("Content-Type", "application/json")
}

export const store = async (name: string) => {
  return await request(await app()).post("/categories").set("Content-Type", "multipart/form-data;").field({ name })
}

export const update = async (id: string, name: string) => {
  return await request(await app()).patch(`/categories/${id}`).set("Content-Type", "application/json").field({ name })
}

export const destroy = async (id: string) => {
  return await request(await app()).delete(`/categories/${id}`).set("Content-Type", "application/json")
}

