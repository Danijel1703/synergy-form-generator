type CustomRule = {
  name: string;
  validator: (values: any) => {
    isValid: boolean;
    error: string | undefined;
  };
  isActive: boolean | ((formValues: any) => boolean);
};

type TCustomRules = Array<CustomRule>;

export default TCustomRules;
