import { errorConstants } from "~/constants";
import { TFormField } from "~/types";

const getError = (field: TFormField, rule: string, isValid: boolean) => {
	if (isValid) return undefined;
	return errorConstants[rule];
};

export default getError;
