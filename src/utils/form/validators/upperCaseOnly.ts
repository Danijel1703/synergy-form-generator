import { ruleConstants } from "~/constants";
import { TFormField } from "~/types";
import getError from "../getError";

function upperCaseOnly(field: TFormField) {
	const { value } = field;
	const isValid = /^[A-Z]+$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.upperCaseOnly, isValid),
	};
}

export default upperCaseOnly;
