import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function mustContainLower(field: TFormField) {
	const { value } = field;
	const isValid = /[a-z]/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.mustContainLower, isValid),
	};
}
export default mustContainLower;
