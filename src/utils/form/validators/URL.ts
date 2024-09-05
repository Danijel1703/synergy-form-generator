import { ruleConstants } from "~/constants";
import getError from "../getError";
import { TFormField } from "~/types";

function URL(field: TFormField) {
	const { value } = field;
	const isValid = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.URL, isValid),
	};
}

export default URL;
