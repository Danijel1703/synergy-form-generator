import { TFormFieldBase, TValidator } from ".";

type TFormField = TFormFieldBase & {
  validators: Array<TValidator>;
  addFormReference: Function;
  dynamicRules: object;
  toggleDynamicRules: Function;
  resetError: () => void;
};

export default TFormField;
