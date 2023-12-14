import { TDropdownStore, TForm, TRule } from ".";
import { FunctionComponent } from "react";

interface TFormField {
	name: string;
	label: string;
	type: string;
	value: string | number | undefined;
	onChange: Function;
	component: FunctionComponent;
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
}

export default TFormField;
