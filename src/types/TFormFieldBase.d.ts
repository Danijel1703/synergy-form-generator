import { FunctionComponent } from 'react';

type TFormFieldBase = {
	name: string;
	label: string;
	type: string;
	value: string | number | undefined;
	onChange: Function;
	component: FunctionComponent;
	validate: Function;
	isValid: boolean;
	className?: string;
	error?: string;
	id: string;
	addOnChangeCallback: (func: Function) => void;
	rules: TRules;
};

export default TFormFieldBase;
