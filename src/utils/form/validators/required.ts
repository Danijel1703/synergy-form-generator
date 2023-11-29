import { isEmpty } from "lodash";

function required(value: any): { isValid: boolean; error: string | undefined } {
	const isValid = !isEmpty(value);
	const error = !isValid ? "Field is required" : undefined;
	return new Promise((resolve, reject) => {
		resolve({ isValid, error: error });
	});
	return { isValid, error: error };
}

export default required;
