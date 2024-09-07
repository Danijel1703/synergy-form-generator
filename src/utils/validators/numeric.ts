import { ruleConstants } from "synergy-form-generator/constants";
import getError from "../getError";
import { TFormField } from "synergy-form-generator/types";
import { isNumber } from "lodash";

function numeric(field: TFormField) {
	const { value } = field;
	const isValid = isNumber(value);

	return {
		isValid,
		error: getError(field, ruleConstants.numeric, isValid),
	};
}

export default numeric;
