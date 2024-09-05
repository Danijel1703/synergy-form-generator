import { ruleConstants } from "~/constants";
import { TFormField } from "~/types";
import getError from "../getError";

function notIn(field: TFormField, forbiddenValues: Array<any>) {
	const { value } = field;
	const isValid = !forbiddenValues.includes(value);
	return {
		isValid,
		error: getError(field, ruleConstants.notIn, isValid),
	};
}

export default notIn;
