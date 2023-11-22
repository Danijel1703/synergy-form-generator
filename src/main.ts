import { action, makeObservable, observable } from "mobx";
import { FunctionComponent } from "react";
import inputComponents from "~/components/inputComponents";
import { TValidator, TValidatorFunction } from "./types";
import { validators } from "./utils/form/validators";

type Validators = { [key: string]: TValidatorFunction };

class MainModule {
  components: { [key: string]: FunctionComponent };
  validators: Validators = validators;

  constructor() {
    this.components = inputComponents;
    makeObservable(this, {
      setComponents: action,
      replaceComponent: action,
      components: observable,
    });
  }

  setValidator({ name, validator }: TValidator) {
    this.validators[name] = validator;
  }

  setComponents(components: { [key: string]: FunctionComponent }) {
    this.components = components;
  }

  replaceComponent({
    name,
    component,
  }: {
    name: string;
    component: FunctionComponent;
  }) {
    this.components[name] = component;
  }
}

export default new MainModule() as MainModule;
