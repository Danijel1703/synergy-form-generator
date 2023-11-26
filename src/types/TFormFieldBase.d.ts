import { FunctionComponent } from 'react';

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
};

export default TFormFieldBase;
