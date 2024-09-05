import { ruleConstants } from "~/constants";
import { TFormField } from "~/types";
import getError from "../getError";

function isIn(field: TFormField, validValues: Array<any>) {
	const { value } = field;
	const isValid = validValues.includes(value);
	return {
		isValid,
		error: getError(field, ruleConstants.isIn, isValid),
	};
}

export default isIn;
