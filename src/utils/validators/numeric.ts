import { ruleConstants } from "synergy-form-generator/constants";
import getError from "../getError";
import { TFormField } from "synergy-form-generator/types";

function numeric(field: TFormField) {
	const { value } = field;
	const isValid = /^[0-9]+$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.numeric, isValid),
	};
}

export default numeric;
