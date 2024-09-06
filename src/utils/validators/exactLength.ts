import { ruleConstants } from "synergy-form-generator/constants";
import getError from "../getError";
import { TFormField } from "synergy-form-generator/types";

function exactLength(field: TFormField, length: number) {
	const { value } = field;
	const isValid = (value as string).length === length;
	return {
		isValid,
		error: getError(field, ruleConstants.exactLength, isValid),
	};
}

export default exactLength;
