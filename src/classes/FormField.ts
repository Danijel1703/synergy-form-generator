import { each, filter, isArray, isEmpty, isFunction, isNil } from "lodash";
import { FunctionComponent } from "react";
import { PasswordInput, TextInput } from "~/components";
import { TFieldProps, TFormField } from "~/types";
import { validateField } from "~/utils";
import { makeObservable, observable, action } from "mobx";
import { v4 as uuidv4 } from "uuid";
import { validators } from "~/utils/form/validators";

type TValidators = Array<
  (value: any) => { isValid: boolean; error: string | undefined }
>;

type TDynamicRules = { [key: string]: (value: any) => boolean };
type TForm = Array<TFormField>;

class FormField<TEntity> {
  private fieldProps: TFieldProps;
  private _validators: Array<
    (value: string) => { isValid: boolean; error: string | undefined }
  > = [];
  value: any;
  entity: TEntity;
  error: string | undefined;
  isValid: boolean = true;
  type: string;
  name: string;
  label: string;
  initialized: boolean = false;
  id: string;
  dynamicRules: TDynamicRules = {};
  form: TForm = [];
  rules: { [key: string]: boolean } = {};
  onChangeCallback: Function = () => {};

  constructor(fieldProps: TFieldProps, entity: TEntity) {
    makeObservable(this, {
      value: observable,
      error: observable,
      isValid: observable,
      onChange: action,
      validate: action,
    });
    this.fieldProps = fieldProps;
    this.entity = entity;
    this.value = this.entity[this.fieldProps.name as keyof TEntity];
    if (fieldProps.validators) {
      this.setValidators(fieldProps.validators);
    }
    if (fieldProps.rules) {
      this.setRules(fieldProps.rules);
    }
    this.label = this.fieldProps.label;
    this.name = this.fieldProps.name;
    this.type = this.fieldProps.type;
    this.id = uuidv4();
    this.onChange = this.onChange.bind(this);
    this.initialize();
  }

  addFormReference(form: TForm) {
    this.form = form;
  }

  initialize() {
    this.validate();
    this.initialized = true;
  }

  get component(): FunctionComponent {
    const components: { [key: string]: any } = {
      text: TextInput,
      password: PasswordInput,
    };
    return components[this.type];
  }

  validate() {
    const validation = validateField(this.value, this.validators);
    if (this.initialized) {
      this.error = validation.error;
    }
    this.isValid = validation.isValid;
  }

  get validators() {
    return this._validators;
  }

  onChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.value = e.target.value;
    if (!isEmpty(this.dynamicRules)) {
      this.setDynamicRules(this.dynamicRules);
    }
    this.validate();
  }

  setOnChangeCallback(onChangeCallback: Function) {
    this.onChangeCallback = onChangeCallback;
  }

  setDynamicRules(dynamicRules: TDynamicRules) {
    each(dynamicRules, (func, key) => {
      this.rules[key] = func(this.form.values());
      this.setValidators();
    });
  }

  setRules(rules: TRules) {
    each(rules, (value, key) => {
      if (isFunction(value)) return (this.dynamicRules[key] = value);
      this.rules[key] = Boolean(value);
    });
    this.setValidators();
  }

  setValidators(_validators?: TValidators) {
    const rules: any = [];
    const temp: any = { ...validators };
    each(this.rules, (value, key) => {
      if (value) {
        rules.push(temp[key]);
      }
    });
    if (isArray(_validators)) {
      this._validators = [...this._validators, ..._validators, ...rules];
    }
  }
}

export default FormField;
