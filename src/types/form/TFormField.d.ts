import { FunctionComponent } from 'react';

type TFormField = {
	validators: Array<
		(value: any) => { isValid: boolean; error: string | undefined }
	>;
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
	addFormReference: Function;
	dynamicRules: object;
	addOnChangeCallback: (func: Function) => void;
	toggleDynamicRules: Function;
	rules: TRules;
	resetError: () => void;
};

export default TFormField;
