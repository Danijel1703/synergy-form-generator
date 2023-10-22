type TFieldComponentProps = {
	onChange: () => void;
	placeholder: string;
	label: string;
	value: string;
	className?: string;
	isValid: boolean;
	error?: string;
	rules: TRules;
};

export default TFieldComponentProps;
