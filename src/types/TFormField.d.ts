import { TForm, TFormFieldBase } from ".";

type TFormField = TFormFieldBase & {
  form: TForm;
  errors: Array<{ error: string; rule: string }>;
};

export default TFormField;
