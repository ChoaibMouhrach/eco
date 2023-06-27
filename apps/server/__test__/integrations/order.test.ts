describe("GET /orders", () => {
  it.todo("Should return 200 with paginated data");
  it.todo("Should return 200 with v in the name");
  it.todo("Should return 200 with sorted data");
});

describe("GET /orders/:id", () => {
  it.todo("SHould return 200 with order info");
  it.todo("Should return 400 with order not found");
});

describe("POST /orders", () => {
  it.todo("Should return 201 with created order");
  it.todo("Should return 400 with name required");
  it.todo("Should return 400 with name errors");
});

describe("PATCH /orders/:id", () => {
  it.todo("Should return 204");
  it.todo("Should return 400 with order not found");
  it.todo("Should return 400 with change someting first");
  it.todo("Should return 400 with name errors");
});

describe("DELETE /orders/:id", () => {
  it.todo("Should return 200");
  it.todo("Should return 400 with order not found");
});

describe("AUTHORIZATION", () => {
  it.todo("Should return 401 with unauthorized");
});
