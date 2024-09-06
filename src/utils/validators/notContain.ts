import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function notContain(field: TFormField, forbiddenValue: string | RegExp) {
	const { value } = field;
	let isValid: boolean;

	if (typeof forbiddenValue === "string") {
		isValid = !(value as string).includes(forbiddenValue);
	} else if (forbiddenValue instanceof RegExp) {
		isValid = !forbiddenValue.test(value as string);
	} else {
		isValid = false;
	}

	return {
		isValid,
		error: getError(field, ruleConstants.notContain, isValid),
	};
}

export default notContain;
