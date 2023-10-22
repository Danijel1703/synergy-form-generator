import { isEmpty } from "lodash";

function required(value: any): { isValid: boolean; error: string | undefined } {
  const isValid = !isEmpty(value);
  const error = !isValid ? "Field is required" : undefined;
  return { isValid, error: error };
}

export default required;
