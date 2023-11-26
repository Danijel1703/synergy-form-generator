import { TFormField } from ".";

type TForm = {
  fields: { [key: string]: TFormField };
  values: Function;
  errors: () => Array<{
    field: string;
    errors: Array<{ rule: string; error: string }>;
  }>;
};

export default TForm;
