import { TFormField } from "~/types";
import getError from "../getError";
import { ruleConstants } from "~/constants";

function noWhitespace(field: TFormField) {
	const { value } = field;
	const isValid = !/\s/.test(value as string); // Must not contain whitespace
	return {
		isValid,
		error: getError(field, ruleConstants.noWhitespace, isValid),
	};
}

export default noWhitespace;
