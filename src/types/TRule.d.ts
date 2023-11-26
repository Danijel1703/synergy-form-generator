type TRule = {
	name: string;
	isActive: boolean;
	isValid: boolean;
	error: string | undefined;
	clearError: () => void;
};

export default TRule;
