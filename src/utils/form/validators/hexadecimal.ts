import { ruleConstants } from "~/constants";
import getError from "../getError";
import { TFormField } from "~/types";

function hexadecimal(field: TFormField) {
	const { value } = field;
	const isValid = /^[0-9A-Fa-f]+$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.hexadecimal, isValid),
	};
}

export default hexadecimal;
