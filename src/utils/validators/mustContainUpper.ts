import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function mustContainUpper(field: TFormField) {
	const { value } = field;
	const isValid = /[A-Z]/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.mustContainUpper, isValid),
	};
}
export default mustContainUpper;
