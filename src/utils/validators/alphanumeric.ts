import { ruleConstants } from "synergy-form-generator/constants";
import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";

function alphanumeric(field: TFormField) {
	const { value } = field;
	const isValid = /^[a-zA-Z0-9]+$/.test(value as string); // Letters and numbers only
	return {
		isValid,
		error: getError(field, ruleConstants.alphanumeric, isValid),
	};
}

export default alphanumeric;