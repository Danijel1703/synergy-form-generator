import { TFormField } from "~/types";
import getError from "../getError";
import { ruleConstants } from "~/constants";

function mustContainUpper(field: TFormField) {
	const { value } = field;
	const isValid = /[A-Z]/.test(value as string);
	return {
		isValid,
		error: getError(field, ruleConstants.mustContainUpper, isValid),
	};
}
export default mustContainUpper;
