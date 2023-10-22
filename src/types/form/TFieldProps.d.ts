type TFieldProps = {
  name: string;
  label: string;
  type: string;
  className?: string;
  validators?: Array<
    (value: any) => { isValid: boolean; error: string | undefined }
  >;
  rules: TRules;
};

export default TFieldProps;
