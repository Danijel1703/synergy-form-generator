import { ruleConstants } from "synergy-form-generator/constants";
import getError from "../getError";
import { TFormField } from "synergy-form-generator/types";

function uuid(field: TFormField) {
	const { value } = field;
	const isValid =
		/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
			value as string
		);
	return {
		isValid,
		error: getError(field, ruleConstants.uuid, isValid),
	};
}

export default uuid;
