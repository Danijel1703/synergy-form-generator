import { ChangeEventHandler } from "react";
import {
	TDropdownStore,
	TFieldComponentType,
	TSelectableItem,
	TSynergyRules,
} from ".";

type TFieldComponentProps = {
	onChange: ChangeEventHandler<HTMLInputElement>;
	placeholder: string;
	label: string;
	value: any;
	className?: string;
	isValid: boolean;
	error?: string;
	rules: TSynergyRules;
	disabled: boolean;
	items?: Array<TSelectableItem>;
	dropdownStore?: TDropdownStore;
	type: TFieldComponentType;
	isRequired?: boolean;
	fieldClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
	inputClassName?: string;
};

export default TFieldComponentProps;
