import { ruleConstants } from "synergy-form-generator/constants";
import { TFormField } from "synergy-form-generator/types";
import getError from "../getError";

function base64(field: TFormField) {
	const { value } = field;
	const isValid =
		/^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/.test(
			value as string
		);
	return {
		isValid,
		error: getError(field, ruleConstants.base64, isValid),
	};
}

export default base64;
