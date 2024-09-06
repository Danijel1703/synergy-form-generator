import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function decimal(field: TFormField) {
	const { value } = field;
	const isValid = (value as number) % 1 !== 0;
	return {
		isValid,
		error: getError(field, ruleConstants.decimal, isValid),
	};
}
export default decimal;
