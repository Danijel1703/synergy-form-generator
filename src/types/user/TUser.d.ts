import { Guid } from "typescript-guid";

interface TUser {
  username: string;
  firstName: string;
  lastName: string;
  roleId?: Guid;
  id?: Guid;
  email: string;
}

export default TUser;
