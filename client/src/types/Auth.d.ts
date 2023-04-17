export type Credentials = {
  email: string;
  password: string;
};

export type UserSignUp = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  verifiedAt: null | string;
  deletedAt: null | string;
  createdAt: string;
  updatedAt: string;
};
