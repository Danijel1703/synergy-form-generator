import { TForm, TFormFieldBase } from '.';

type TFormField = TFormFieldBase & {
	addFormReference: Function;
	form: TForm;
	errors: Array<{ error: string; rule: string }>;
};

export default TFormField;
