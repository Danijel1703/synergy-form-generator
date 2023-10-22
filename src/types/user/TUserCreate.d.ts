import { TUser } from "..";

interface TUserCreate extends TUser {
  password: string;
  confirmedPassword: string;
  confirmedEmail: string;
}

export default TUserCreate;
