describe("GET /purchases", () => {
  it.todo("Should return 200 with paginated data");
  it.todo("Should return 200 with v in the name");
  it.todo("Should return 200 with sorted data");
});

describe("GET /purchases/:id", () => {
  it.todo("SHould return 200 with purchase info");
  it.todo("Should return 400 with purchase not found");
});

describe("POST /purchases", () => {
  it.todo("Should return 201 with created purchase");
  it.todo("Should return 400 with name required");
  it.todo("Should return 400 with name errors");
});

describe("PATCH /purchases/:id", () => {
  it.todo("Should return 204");
  it.todo("Should return 400 with purchase not found");
  it.todo("Should return 400 with change someting first");
  it.todo("Should return 400 with name errors");
});

describe("DELETE /purchases/:id", () => {
  it.todo("Should return 200");
  it.todo("Should return 400 with purchase not found");
});

describe("AUTHORIZATION", () => {
  it.todo("Should return 401 with unauthorized");
});
