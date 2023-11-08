type TValidatorFunction = (value: any) => {
  isValid: boolean;
  error: string | undefined;
};

export default TValidatorFunction;
