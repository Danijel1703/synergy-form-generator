import { ruleConstants } from "~/constants";
import getError from "../getError";
import { TFormField } from "~/types";

function mustStartWith(field: TFormField, startValue: string | RegExp) {
	const { value } = field;
	let isValid = false;
	if (typeof startValue === "string") {
		isValid = (value as string).startsWith(startValue);
	} else if (startValue instanceof RegExp) {
		isValid = startValue.test(value as string);
	} else {
		isValid = false;
	}
	return {
		isValid,
		error: getError(field, ruleConstants.mustStartWith, isValid),
	};
}

export default mustStartWith;
