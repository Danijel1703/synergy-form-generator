import { TFormField } from "~/types";
import MainModule from "~/main";

const getError = (field: TFormField, rule: string, isValid: boolean) => {
	if (isValid) return undefined;
	return MainModule.errorConstants[rule];
};

export default getError;
