import { TDropdownStore, TFieldComponentType } from ".";

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
	items?: Array<{ id: string; value: any; label: string }>;
	dropdownStore?: TDropdownStore;
	type: TFieldComponentType;
};

export default TFieldComponentProps;
