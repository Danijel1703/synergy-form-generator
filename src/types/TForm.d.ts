import { FormEventHandler } from "react";
import { TFormField, TOptions } from ".";

interface TForm {
	fields: { [key: string]: TFormField };
	errors: Array<{
		field: string;
		errors: Array<{ rule: string; error: string }>;
	}>;
	options: TOptions;
	onSubmit: Function;
	isValid: boolean;
	values: { [key: string]: any };
	entity: any;
	addField: (field: TFormField) => void;
	hasChanged: () => boolean;
}

export default TForm;
