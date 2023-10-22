import { every, find, isEmpty, isFunction } from "lodash";

type Validation = { isValid: boolean; error: string | undefined };

function validateField(
  value: string | number | undefined,
  validators: Array<
    (value: any) => {
      isValid: boolean;
      error: string | undefined;
    }
  >
): Validation {
  const defaultValue = { isValid: true, error: undefined };
  if (isEmpty(validators)) return defaultValue;
  const valid = every(validators, (validator) => validator(value).isValid);
  if (valid) defaultValue;
  const func = find(validators, (validator) => !validator(value).isValid);
  return isFunction(func) ? func(value) : defaultValue;
}

export default validateField;
