import { FormField } from "~/classes";
import { TFieldProps, TForm } from "~/types";

function createField(
	fieldProps: TFieldProps,
	form: TForm,
	addToForm: boolean = true
) {
	const field = new FormField(fieldProps, form.entity, form);
	addToForm && form.addField(field);
	return field;
}

export default createField;
