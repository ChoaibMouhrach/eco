import { Authorize } from '../../interfaces/Request';
import { User } from '../../interfaces/User';

const authorize: Authorize = (user?: User) => {
  return user && user.isAdmin;
};

export default {
  authorize,
};
