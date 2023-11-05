import { FunctionComponent } from "react";
type TFieldProps = {
  name: string;
  label: string;
  type: string;
  className?: string;
  validators?: Array<
    (value: any) => { isValid: boolean; error: string | undefined }
  >;
  customComponent?: FunctionComponent;
  rules: TRules;
};

export default TFieldProps;
