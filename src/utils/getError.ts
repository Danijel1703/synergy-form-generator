import { TFormField } from "synergy-form-generator/types";
import MainModule from "synergy-form-generator/MainModule";

const getError = (_field: TFormField, rule: string, isValid: boolean) => {
	if (isValid) return undefined;
	return MainModule.errorConstants[rule];
};

export default getError;
