import { ROLES } from "@src/constants"
import { AuthRequest, Authorize } from ".."

const authorize: Authorize = (request: AuthRequest) => {
  const { user } = request.auth!
  return user.roleId === ROLES.ADMIN
}

export const indexUserRequest = {
  authorize
}
