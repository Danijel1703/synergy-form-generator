import { TDropdownStore, TForm, TFormFieldBase } from ".";

type TFormField = TFormFieldBase & {
	form: TForm;
	errors: Array<{ error: string; rule: string }>;
	dropdownStore?: TDropdownStore;
};

export default TFormField;
