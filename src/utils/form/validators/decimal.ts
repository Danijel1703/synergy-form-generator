import { TFormField } from "~/types";
import getError from "../getError";
import { ruleConstants } from "~/constants";

function decimal(field: TFormField) {
	const { value } = field;
	const isValid = (value as number) % 1 !== 0;
	return {
		isValid,
		error: getError(field, ruleConstants.decimal, isValid),
	};
}
export default decimal;
