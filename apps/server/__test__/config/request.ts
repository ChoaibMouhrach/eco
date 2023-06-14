import makeApp from "@src/app"
import supertest from "supertest"

const request = () => {
  return supertest(makeApp("test"))
}

export default request
