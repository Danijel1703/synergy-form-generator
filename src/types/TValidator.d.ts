type TValidator = {
	validator: (value: any) => {
		isValid: boolean;
		error: string | undefined;
	};
	error: string | undefined;
	isValid: boolean;
};

export default TValidator;
