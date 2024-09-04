import { isEmpty } from "lodash";
import { TFormField } from "~/types";
import getError from "../getError";
import { ruleConstants } from "~/constants";

function required(field: TFormField): {
	isValid: boolean;
	error: string | undefined;
} {
	const { value } = field;
	const isValid = !isEmpty(value);
	return { isValid, error: getError(field, ruleConstants.required, isValid) };
}

export default required;
