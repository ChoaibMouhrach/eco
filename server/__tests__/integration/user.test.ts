import { hashSync } from "bcrypt";
import makeApp from "../../src/app";
import { adminPayload, userPayload } from "../../src/common/constants/testData.constant";
import { config } from "../../src/config/config";
import User from "../../src/models/User"
import jwt from "jsonwebtoken"
import request from "supertest"

let token: string;

beforeEach(async () => {
  await User.deleteMany({})

  const user = new User(adminPayload);
  token = jwt.sign({ _id: user.id }, config.ACCESS_SECRET);
  await user.save();
})

afterEach(async () => {
  await User.deleteMany({})
})

describe("GET /users", () => {

  it("Should return 200 with a list of users", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user.save()

    const response = await request(await makeApp())
      .get("/users")
      .set("Authorization", `bearer ${token}`)

    expect(response.status).toBe(200)

    expect(response.body?.data[1]?.firstName).toBe(user.firstName)
    expect(response.body?.data[1]?.lastName).toBe(user.lastName)
    expect(response.body?.data[1]?.email).toBe(user.email)

    expect(response.body?.count).toBeDefined()
    expect(response.body?.page).toBeDefined()
    expect(response.body?.limit).toBeDefined()
    expect(response.body?.skip).toBeDefined()

  });

  it("Should return 200 with a list of projected users", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user.save()

    const response = await request(await makeApp())
      .get("/users?project=firstName")
      .set("Authorization", `bearer ${token}`)

    expect(response.status).toBe(200)

    expect(response.body?.data[1]?.firstName).toBeDefined()
    expect(response.body?.data[1]?.lastName).toBeUndefined()

    expect(response.body?.count).toBeDefined()
    expect(response.body?.page).toBeDefined()
    expect(response.body?.limit).toBeDefined()
    expect(response.body?.skip).toBeDefined()

  });

  it("Should return 200 with a list of sorted users", async () => {

    const user1 = new User({
      ...userPayload,
      firstName: "222",
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user1.save()

    const user2 = new User({
      ...userPayload,
      email: 1 + userPayload.email,
      firstName: "111",
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user2.save()

    const response = await request(await makeApp())
      .get("/users?sort=firstName")
      .set("Authorization", `bearer ${token}`)

    expect(response.status).toBe(200)

    expect(response.body?.data[0]?.firstName).toBe(user2.firstName)
    expect(response.body?.data[1]?.firstName).toBe(user1.firstName)

    expect(response.body?.count).toBeDefined()
    expect(response.body?.page).toBeDefined()
    expect(response.body?.limit).toBeDefined()
    expect(response.body?.skip).toBeDefined()

  });

  it("Should return 200 with a list of sorted users DESC", async () => {

    const user1 = new User({
      ...userPayload,
      firstName: "111",
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user1.save()

    const user2 = new User({
      ...userPayload,
      email: 1 + userPayload.email,
      firstName: "222",
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user2.save()

    const response = await request(await makeApp())
      .get("/users?sort=firstName:desc")
      .set("Authorization", `bearer ${token}`)

    expect(response.status).toBe(200)

    expect(response.body?.data[1]?.firstName).toBe(user2.firstName)
    expect(response.body?.data[2]?.firstName).toBe(user1.firstName)

    expect(response.body?.count).toBeDefined()
    expect(response.body?.page).toBeDefined()
    expect(response.body?.limit).toBeDefined()
    expect(response.body?.skip).toBeDefined()

  });

  it("Should return 200 with a list of searched users", async () => {

    const user1 = new User({
      ...userPayload,
      firstName: "111",
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user1.save()

    const user2 = new User({
      ...userPayload,
      email: 1 + userPayload.email,
      firstName: "222",
      password: hashSync(userPayload.password, Number(config.SALT)),
    })

    await user2.save()

    const response = await request(await makeApp())
      .get("/users?search=111")
      .set("Authorization", `bearer ${token}`)

    expect(response.status).toBe(200)

    expect(response.body?.data.length).toBe(1)
    expect(response.body?.data[0]?.firstName).toBe(user1.firstName)

    expect(response.body?.count).toBeDefined()
    expect(response.body?.page).toBeDefined()
    expect(response.body?.limit).toBeDefined()
    expect(response.body?.skip).toBeDefined()

  });

})

describe("GET /users/:id", () => {

  it("Should return 200 with user", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT))
    })

    await user.save()

    const response = await request(await makeApp())
      .get(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(200);
    expect(response.body?.firstName).toBe(user.firstName)

  });

  it("Should return 400 with invalid id", async () => {

    const response = await request(await makeApp())
      .get(`/users/1`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400)
    expect(response.body?.message).toBe("Id is not valid")
    expect(response.body?.error).toBe("Bad Request")

  });

  it("Should return 404 with User Not found", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT))
    })

    const response = await request(await makeApp())
      .get(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(404);
    expect(response.body?.statusCode).toBe(404)
    expect(response.body?.message).toBe("User Not found")
    expect(response.body?.error).toBe("Not Found")

  });

})

describe("POST /users", () => {

  it("Should return 201 with user", async () => {

    const response = await request(await makeApp())
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...userPayload,
        password_confirmation: userPayload.password
      })

    expect(response.status).toBe(201)
    expect(response.body?.firstName).toBe(userPayload.firstName)

  })

  it("Should return 400 with password and password_confirmation does not match", async () => {

    const response = await request(await makeApp())
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...userPayload,
        password_confirmation: "xxx5646540"
      })

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400)
    expect(response.body?.message).toMatchObject([{ message: "Password and Password confirmation does not exists", path: ["password_confirmation"] }])
    expect(response.body?.error).toBe("Bad Request")

  })

  it("Should return 400 with email is already taken", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT))
    })

    await user.save()

    const response = await request(await makeApp())
      .post("/users")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...userPayload,
        password_confirmation: userPayload.password
      })

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400)
    expect(response.body?.message).toMatchObject([{ message: "Email address is already taken", path: ["email"] }])
    expect(response.body?.error).toBe("Bad Request")

  })

})

describe("PATCH /users/:id", () => {

  it("Should return 200 with user", async () => {

    let firstName = "x212121"

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT))
    })

    await user.save()

    const response = await request(await makeApp())
      .patch(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        firstName
      })


    expect(response.status).toBe(200);
    expect(response.body?.firstName).toBe(firstName)

  })

  it("Should return 400 with password and password_confirmation does not match", async () => {

    const response = await request(await makeApp())
      .patch("/users/4")
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...userPayload,
        password_confirmation: userPayload.password
      })

    expect(response.status).toBe(400);
    expect(response.body?.statusCode).toBe(400)
    expect(response.body?.message).toBe("Id is invalid")
    expect(response.body?.error).toBe("Bad Request")

  })

  it("Should return 404 with User does not exists", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT))
    })

    const response = await request(await makeApp())
      .patch(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        ...userPayload,
        password_confirmation: userPayload.password
      })

    expect(response.status).toBe(404);
    expect(response.body?.statusCode).toBe(404)
    expect(response.body?.message).toBe("User does not exists")
    expect(response.body?.error).toBe("Not Found")

  })

})

describe("DELETE /users/:id", () => {

  it("Should return 204", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT))
    })

    await user.save()

    const response = await request(await makeApp())
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(204)

  })

  it("Should return 400 with id is not valid", async () => {

    const response = await request(await makeApp())
      .delete(`/users/1`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(400)
    expect(response.body?.statusCode).toBe(400)
    expect(response.body?.message).toBe("Id is not valid")
    expect(response.body?.error).toBe("Bad Request")

  })

  it("Should return 404 with User does not exists", async () => {

    const user = new User({
      ...userPayload,
      password: hashSync(userPayload.password, Number(config.SALT))
    })

    const response = await request(await makeApp())
      .delete(`/users/${user._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(response.status).toBe(404)
    expect(response.body?.statusCode).toBe(404)
    expect(response.body?.message).toBe("User does not exists")
    expect(response.body?.error).toBe("Not Found")

  })

})
