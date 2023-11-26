import { isFunction } from "lodash";
import { TFormField } from "~/types";
import { Validator } from ".";

type RuleConfig = {
  name: string;
  validator: (value: any) => {
    isValid: boolean;
    error: string | undefined;
  };
  isActive: boolean | ((values: any) => boolean);
};

class Rule extends Validator {
  name: string = "";
  getIsActive: (value: any) => boolean = () => false;

  constructor({ name, isActive, validator }: RuleConfig, field: TFormField) {
    super(validator, field);
    this.name = name;
    this.isActive = isActive;
    if (isFunction(isActive)) {
      this.getIsActive = isActive;
      this.isActive = this.getIsActive(field.form.values);
      this.addFieldCallback();
    }
  }

  addFieldCallback() {
    this.field.addOnChangeCallback((field: TFormField) => {
      this.isActive = this.getIsActive(field.form.values);
    });
  }
}

export default Rule;
