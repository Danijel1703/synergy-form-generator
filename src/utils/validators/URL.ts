import { ruleConstants } from "synergy-form-generator/constants";
import getError from "../getError";
import { TFormField } from "synergy-form-generator/types";

function URL(field: TFormField) {
	const { value } = field;
	const isValid = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.URL, isValid),
	};
}

export default URL;
