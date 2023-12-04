import { FunctionComponent } from "react";
import { TRule } from ".";

type TFormFieldBase = {
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
};

export default TFormFieldBase;
