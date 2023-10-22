import { Guid } from "typescript-guid";
import { TUserCreate } from "~/types";

class UserCreateModel implements TUserCreate {
  username: string;
  password: string;
  confirmedEmail: string;
  confirmedPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  roleId?: Guid;
  id?: Guid;

  constructor() {
    this.username = "";
    this.password = "";
    this.confirmedEmail = "";
    this.confirmedPassword = "";
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.roleId = undefined;
    this.id = undefined;
  }
}

export default UserCreateModel;
