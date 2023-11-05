import { each, includes, isFunction } from "lodash";
import { FunctionComponent } from "react";
import { TDynamicRules, TFieldProps, TForm, TValidator } from "~/types";
import { validateField } from "~/utils";
import { makeObservable, observable, action } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { validators } from "~/utils/form/validators";
import inputComponents from "~/components/inputComponents";
import MainModule from "~/main";

class FormField<TEntity> {
  private fieldProps: TFieldProps;
  private form: TForm;
  private _component: FunctionComponent =
    inputComponents.TextInput as FunctionComponent;
  private onChangeCallbacks: Array<Function> = [];

  dynamicRules: TDynamicRules = {};
  value: any;
  error: string | undefined;
  isValid: boolean = true;
  rules: { [key: string]: boolean } = {};
  validators: Array<TValidator> = [];
  entity: TEntity;
  type: string;
  name: string;
  id: string;
  label: string;
  customComponent: FunctionComponent;

  constructor(fieldProps: TFieldProps, entity: TEntity) {
    makeObservable(this, {
      value: observable,
      error: observable,
      isValid: observable,
      rules: observable,
      onChange: action,
      validate: action,
      toggleDynamicRules: action,
      resetError: action,
    });
    this.fieldProps = fieldProps;
    this.entity = entity;
    this.label = fieldProps.label;
    this.name = fieldProps.name;
    this.type = fieldProps.type;
    this.id = uuidv4();
    this.customComponent = fieldProps.customComponent;
    this.value = this.entity[this.fieldProps.name as keyof TEntity];
    if (fieldProps.validators) {
      this.setValidators(fieldProps.validators);
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
    this._component = this.customComponent || inputComponents[this.type];
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

  setValue(value: any, validate = true) {
    this.value = value;
    this.entity[this.name as keyof TEntity] = value;
    if (validate) {
      this.validate();
    }
  }

  resetError() {
    this.error = undefined;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setValue(e.target.value, false);
    each(this.onChangeCallbacks, (onChangeCallback) => {
      isFunction(onChangeCallback) && onChangeCallback(this);
    });
    this.validate();
  }

  addOnChangeCallback(onChangeCallback: Function) {
    this.onChangeCallbacks.push(onChangeCallback);
  }

  toggleDynamicRules(dynamicRules: TDynamicRules) {
    each(dynamicRules, (func, key) => {
      this.rules[key] = func(this.form.values());
      this.setValidators();
    });
  }

  private setRules(rules: TRules) {
    each(rules, (value, key) => {
      if (isFunction(value)) return (this.dynamicRules[key] = value);
      this.rules[key] = Boolean(value);
    });
    this.setValidators();
  }

  private setValidators(_validators: Array<TValidator> = []) {
    const rules: any = [];
    const temp: any = { ...validators };
    each(this.rules, (value, key) => {
      if (value) {
        rules.push(temp[key]);
      }
    });
    const v = [..._validators, ...rules];
    each(v, (validator) => {
      if (!includes(this.validators, validator)) {
        this.validators.push(validator);
      }
    });
  }
}

export default FormField;
