import { TValidatorFunction } from ".";

type CustomRule = {
  name: string;
  validator: TValidatorFunction;
  isActive: boolean | ((formValues: any) => boolean);
};

type TCustomRules = Array<CustomRule>;

export default TCustomRules;
