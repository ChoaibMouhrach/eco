import { ROLES } from "@src/constants";
import { AuthRequest } from "..";

const authorize = (request: AuthRequest) => {
  const { user } = request.auth!;

  return user.roleId === ROLES.ADMIN;
};

export const indexPurchaseRequest = {
  authorize,
};
