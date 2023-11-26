type TFieldComponentProps = {
	onChange: () => void;
	placeholder: string;
	label: string;
	value: string;
	className?: string;
	isValid: boolean;
	error?: string;
	rules: TSynergyRules;
	disabled: boolean;
};

export default TFieldComponentProps;
