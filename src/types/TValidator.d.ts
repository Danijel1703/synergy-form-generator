import { TFormField } from ".";

interface TValidator {
	field: TFormField;
	validator: (
		field: TFormField,
		compareValue?: any
	) => {
		isValid: boolean;
		error: string | undefined;
	};
	isActive: ((value: any) => boolean) | boolean;
	_isValid: boolean;
	_error: string | undefined;
}

export default TValidator;
