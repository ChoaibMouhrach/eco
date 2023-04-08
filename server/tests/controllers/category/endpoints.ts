import request from "supertest";
import { app } from "../../../src/app";
import { generateUrl } from "../../urlGenerator";

export const index = async ({
  sort,
  fields,
  search,
  order,
}: Record<string, string | undefined>) => {
  const url = generateUrl({
    baseUrl: "/categories",
    sort,
    fields,
    search,
    order,
  });
  return await request(await app())
    .get(url)
    .set("Content-Type", "application/json");
};

export const store = async (token: string, category: { name?: string }) => {
  return await request(await app())
    .post("/categories")
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send(category);
};

export const update = async (
  token: string,
  id: string,
  category: { name?: string }
) => {
  return await request(await app())
    .patch(`/categories/${id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`)
    .send(category);
};

export const destroy = async (token: string, id: string) => {
  return await request(await app())
    .delete(`/categories/${id}`)
    .set("Content-Type", "application/json")
    .set("Authorization", `Bearer ${token}`);
};
