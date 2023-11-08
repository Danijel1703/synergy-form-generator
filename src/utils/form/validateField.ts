import { every, find, isEmpty, isFunction } from "lodash";
import { TValidator } from "~/types";

type Validation = { isValid: boolean; error: string | undefined };

function validateField(
  value: string | number | undefined,
  rules: Array<TValidator>
): Validation {
  const defaultValue = { isValid: true, error: undefined };
  if (isEmpty(rules)) return defaultValue;
  const valid = every(rules, (rule) => rule.validator(value).isValid);
  if (valid) {
    return defaultValue;
  } else {
    const func = find(
      rules,
      (rule) => !rule.validator(value).isValid
    )?.validator;
    const validation = isFunction(func) ? func(value) : defaultValue;
    return { isValid: validation.isValid, error: validation.error };
  }
}

export default validateField;
