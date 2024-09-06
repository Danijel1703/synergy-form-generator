import { ruleConstants } from "synergy-form-generator/constants";
import getError from "../getError";
import { TFormField } from "synergy-form-generator/types";

function hexadecimal(field: TFormField) {
	const { value } = field;
	const isValid = /^[0-9A-Fa-f]+$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.hexadecimal, isValid),
	};
}

export default hexadecimal;
