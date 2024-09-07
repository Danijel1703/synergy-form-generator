import { TFormField } from "synergy-form-generator/types";
import MainModule from "synergy-form-generator/MainModule";
import { isNumber, isString } from "lodash";

const getError = (
	_field: TFormField,
	rule: string,
	isValid: boolean,
	compareValue?: string | number
) => {
	if (isValid) return undefined;
	const error = MainModule.errorConstants[rule].replace(
		":field:",
		_field.label
	);
	if (!isNumber(compareValue) && !isString(compareValue)) return;
	compareValue = isNumber(compareValue)
		? compareValue.toString()
		: compareValue;
	return error.replace(":compareValue:", compareValue);
};

export default getError;
