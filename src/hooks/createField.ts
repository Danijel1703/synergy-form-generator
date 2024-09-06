import { FormField } from "synergy-form-generator/classes";
import { TFieldProps, TForm } from "synergy-form-generator/types";

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
