import { includes } from "lodash";

function mustContainUpper(value: string) {
  const isValid = includes(value, "A");
  const error = !isValid ? "Must contain A" : undefined;
  return { isValid, error: error };
}
export default mustContainUpper;
