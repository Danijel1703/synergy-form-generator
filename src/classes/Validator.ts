import { computed, makeObservable } from "mobx";
import { TFormField } from "~/types";

class Validator {
  field: TFormField;
  validator: (value: any) => {
    isValid: boolean;
    error: string | undefined;
  };
  isActive: ((value: any) => boolean) | boolean = false;

  constructor(
    validator: (value: any) => {
      isValid: boolean;
      error: string | undefined;
    },
    field: TFormField
  ) {
    makeObservable(this, {
      value: computed,
      error: computed,
    });
    this.field = field;
    this.validator = validator;
  }

  get value() {
    return this.field.value;
  }

  get isValid() {
    if (!this.isActive) return true;
    return this.validator(this.value).isValid;
  }

  get error() {
    if (!this.isActive) return undefined;
    return this.validator(this.value).error;
  }
}

export default Validator;
