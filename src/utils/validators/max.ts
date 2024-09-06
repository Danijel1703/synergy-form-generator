import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function max(field: TFormField, maxValue: number) {
	const { value } = field;
	const isValid = (value as number) <= maxValue;
	return { isValid, error: getError(field, ruleConstants.max, isValid) };
}

export default max;
