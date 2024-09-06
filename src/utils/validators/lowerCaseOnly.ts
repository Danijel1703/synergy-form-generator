import { ruleConstants } from "synergy-form-generator/constants";
import getError from "../getError";
import { TFormField } from "synergy-form-generator/types";

function lowerCaseOnly(field: TFormField) {
	const { value } = field;
	const isValid = /^[a-z]+$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.lowerCaseOnly, isValid),
	};
}

export default lowerCaseOnly;
