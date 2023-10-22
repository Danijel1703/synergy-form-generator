import { UserCreatePage } from "~/pages";
import { UserCreateStore } from "~/stores";
import { inject } from "~/utils";

export default {
  path: "/",
  element: inject(UserCreatePage, UserCreateStore),
};
