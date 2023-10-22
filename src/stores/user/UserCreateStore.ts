import { TUserCreate } from "~/types";
import { UserCreateFields } from "~/form-fields";
import { UserCreateModel } from "~/models";
import { Form } from "~/classes";

class UserCreateStore extends Form<TUserCreate> {
  constructor() {
    super(UserCreateModel, UserCreateFields, () => {});
  }
}

export default UserCreateStore;
