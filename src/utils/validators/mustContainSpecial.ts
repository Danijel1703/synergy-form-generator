import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function mustContainSpecial(field: TFormField) {
	const { value } = field;
	const isValid = /[!@#$%^&*(),.?":{}|<>]/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.mustContainSpecial, isValid),
	};
}

export default mustContainSpecial;
