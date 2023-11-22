import {
  compact,
  each,
  every,
  find,
  includes,
  isEmpty,
  isFunction,
  map,
  pull,
  remove,
  size,
} from "lodash";
import { FunctionComponent } from "react";
import {
  TCustomRules,
  TDynamicRules,
  TFieldProps,
  TForm,
  TValidator,
  TValidatorFunction,
} from "~/types";
import { validateField } from "~/utils";
import { makeObservable, observable, action } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { validators } from "~/utils/form/validators";
import inputComponents from "~/components/inputComponents";
import MainModule from "~/main";

class FormField<TEntity> {
  private fieldProps: TFieldProps;
  private form: TForm = {} as TForm;
  private _component: FunctionComponent =
    inputComponents.TextInput as FunctionComponent;
  private onChangeCallbacks: Array<Function> = [];

  id: string;
  value: any;
  error: string | undefined;
  isValid: boolean = true;
  type: string;
  name: string;
  label: string;
  entity: TEntity;

  dynamicRules: TDynamicRules = {};
  rules: { [key: string]: boolean } = new Proxy(
    {},
    {
      set: (obj: any, prop, value) => {
        obj[prop] = value;
        this.setValidators();
        return true;
      },
    }
  );
  validators: Array<TValidator> = [];
  customComponent: FunctionComponent | undefined;
  customRules: TCustomRules | undefined;

  constructor(fieldProps: TFieldProps, entity: TEntity) {
    makeObservable(this, {
      value: observable,
      error: observable,
      isValid: observable,
      onChange: action,
      validate: action,
      resetError: action,
    });
    this.fieldProps = fieldProps;
    this.customRules = fieldProps.customRules;
    this.entity = entity;
    this.label = fieldProps.label;
    this.name = fieldProps.name;
    this.type = fieldProps.type;
    this.id = uuidv4();
    this.customComponent = fieldProps.customComponent;
    this.value = this.entity[this.fieldProps.name as keyof TEntity];
    if (fieldProps.customRules) {
      this.setCustomRules(fieldProps.customRules);
    }
    if (fieldProps.rules) {
      this.setRules(fieldProps.rules);
    }
    this.onChange = this.onChange.bind(this);
    this.initialize();
  }

  addFormReference(form: TForm) {
    this.form = form;
  }

  private initialize() {
    this._component = this.customComponent || MainModule.components[this.type];
    this.validate();
    this.resetError();
  }

  get component(): FunctionComponent {
    return this._component;
  }

  validate() {
    const validation = validateField(this.value, this.validators);
    this.error = validation.error;
    this.isValid = validation.isValid;
  }

  setValue(value: any) {
    this.value = value;
    this.entity[this.name as keyof TEntity] = value;
    this.validate();
  }

  resetError() {
    this.error = undefined;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setValue(e.target.value);
    each(this.onChangeCallbacks, (onChangeCallback) => {
      isFunction(onChangeCallback) && onChangeCallback(this);
    });
  }

  addOnChangeCallback(onChangeCallback: Function) {
    this.onChangeCallbacks.push(onChangeCallback);
  }

  toggleDynamicRules(dynamicRules: TDynamicRules) {
    each(dynamicRules, (func, key) => {
      this.rules[key] = func(this.form.values());
    });
  }

  private setRules(rules: TRules) {
    each(rules, (value, key) => {
      if (isFunction(value)) return (this.dynamicRules[key] = value);
      this.rules[key] = Boolean(value);
    });
  }

  private setCustomRules(rules: TCustomRules) {
    each(rules, ({ name, validator, isActive }) => {
      MainModule.setValidator({ name, validator });
      if (isFunction(isActive)) return (this.dynamicRules[name] = isActive);
      this.rules[name] = isActive;
    });
  }

  private setValidators() {
    const v = compact(
      map(this.rules, (value, key) => {
        if (value) {
          return { name: key, validator: MainModule.validators[key] };
        }
        remove(this.validators, (validator) => validator.name === key);
      })
    ) as Array<TValidator>;

    each(v, (validator) => {
      const validatorExists = !find(
        this.validators,
        (exValidator) => exValidator.name === validator.name
      );
      if (validatorExists) {
        this.validators.push(validator);
      }
    });
  }
}

export default FormField;
