import { isEmpty } from "lodash";
import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";
import { ruleConstants } from "synergy-form-generator/constants";

function required(field: TFormField): {
	isValid: boolean;
	error: string | undefined;
} {
	const { value } = field;
	const isValid = !isEmpty(value);
	return { isValid, error: getError(field, ruleConstants.required, isValid) };
}

export default required;
