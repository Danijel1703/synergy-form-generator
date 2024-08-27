function mustContainUpper(value: string) {
	const isValid = /[A-Z]/.test(value);
	const error = !isValid ? "Input must contain upper case letter" : undefined;
	return { isValid, error: error };
}
export default mustContainUpper;
