import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function min(field: TFormField, minValue: number) {
	const { value } = field;
	const isValid = (value as number) >= minValue;
	return { isValid, error: getError(field, ruleConstants.min, isValid) };
}

export default min;
