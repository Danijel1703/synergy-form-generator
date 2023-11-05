import { TFormField } from ".";

type TForm = {
  fields: { [key: string]: TFormField };
  values: Function;
};

export default TForm;
