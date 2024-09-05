import { ruleConstants } from "~/constants";
import getError from "../getError";
import { TFormField } from "~/types";

function lowerCaseOnly(field: TFormField) {
	const { value } = field;
	const isValid = /^[a-z]+$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.lowerCaseOnly, isValid),
	};
}

export default lowerCaseOnly;
