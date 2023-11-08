import { TValidatorFunction } from ".";

type TValidator = {
  name: string;
  validator: TValidatorFunction;
};

export default TValidator;
