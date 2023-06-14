export const makeUser = (roleId: number = 1) => {
  return {
    email: `example${Math.random()}@example.com`,
    firstName: "John",
    lastName: "Doe",
    address: "Usa casablanca",
    phone: `+212${Math.floor(Math.random() * 999999999) + 100000000}`,
    roleId,
  };
};

export const makeCategory = () => {
  return {
    name: `Cat${Math.random()}`,
  };
};
