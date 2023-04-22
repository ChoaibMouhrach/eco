import { User } from "../../interfaces/User";
import { Request } from "express";

export interface DeleteReqeust extends Request {
  params: {
    id: string;
  };
}

const authorize = (user?: User) => {
  return Boolean(user && user.isAdmin && user.verifiedAt);
};

export default {
  authorize,
};
