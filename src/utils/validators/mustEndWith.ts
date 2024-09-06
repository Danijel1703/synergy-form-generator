import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function mustEndWith(field: TFormField, endValue: string | RegExp) {
	const { value } = field;
	let isValid: boolean;

	if (typeof endValue === "string") {
		isValid = (value as string).endsWith(endValue);
	} else if (endValue instanceof RegExp) {
		isValid = endValue.test(value as string);
	} else {
		isValid = false;
	}

	return {
		isValid,
		error: getError(field, ruleConstants.mustEndWith, isValid),
	};
}

export default mustEndWith;
