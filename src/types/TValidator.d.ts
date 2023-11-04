type TValidator = (value: any) => {
	isValid: boolean;
	error: string | undefined;
};

export default TValidator;
