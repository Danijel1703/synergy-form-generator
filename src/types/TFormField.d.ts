import { ChangeEventHandler } from "react";
import {
	TDropdownStore,
	TForm,
	TRule,
	TSelectableItem,
	TSynergyFieldComponent,
} from ".";

interface TFormField {
	name: string;
	label: string;
	type: string;
	value: string | number | undefined;
	onChange: ChangeEventHandler<HTMLInputElement>;
	component: TSynergyFieldComponent;
	className?: string;
	id: string;
	addOnChangeCallback: (func: Function) => void;
	isValid: boolean;
	error: string | undefined;
	dependencies: Array<string>;
	rules: Array<TRule>;
	form: TForm;
	errors: Array<{ error: string; rule: string }>;
	dropdownStore?: TDropdownStore;
	hideField?: boolean;
	items?: Array<TSelectableItem>;
	hasChanged: () => boolean;
	fieldClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
	inputClassName?: string;
	clear: () => void;
	reset: () => void;
	disable: () => void;
	enable: () => void;
}

export default TFormField;
