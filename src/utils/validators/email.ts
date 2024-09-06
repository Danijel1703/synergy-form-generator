import { ruleConstants } from "synergy-form-generator/constants";
import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";

function email(field: TFormField) {
	const { value } = field;
	const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value as string); // Basic email validation
	return {
		isValid,
		error: getError(field, ruleConstants.email, isValid),
	};
}

export default email;
