import { ruleConstants } from "~/constants";
import getError from "../getError";
import { TFormField } from "~/types";

function exactLength(field: TFormField, length: number) {
	const { value } = field;
	const isValid = (value as string).length === length;
	return {
		isValid,
		error: getError(field, ruleConstants.exactLength, isValid),
	};
}

export default exactLength;
