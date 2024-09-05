import { ruleConstants } from "~/constants";
import { TFormField } from "~/types";
import getError from "../getError";

function mustContainDigit(field: TFormField) {
	const { value } = field;
	const isValid = /\d/.test(value as string); // Must contain at least one digit
	return {
		isValid,
		error: getError(field, ruleConstants.mustContainDigit, isValid),
	};
}

export default mustContainDigit;
