import { app } from "../../../src/app"
import request from "supertest"

export const login = async (body: any) => {
  return request(await app()).post("/login").set("Content-Type", "application/json").send(body)
}

export const register = async (body: any) => {
  return request(await app()).post("/register").set("Content-Type", "application/json").send(body)
}

export const refresh = async (token: string) => {
  return request(await app()).post("/refresh").set("Content-Type", "application/json").set("Authorization", `Bearer ${token}`)
}

export const verify = async (token: string) => {
  return request(await app()).get("/verify").set("Content-Type", "application/json").set("Authorization", `Bearer ${token}`)
}

export const logout = async (token: string) => {
  return request(await app()).post("/logout").set("Content-Type", "application/json").set("Authorization", `Bearer ${token}`)
}
