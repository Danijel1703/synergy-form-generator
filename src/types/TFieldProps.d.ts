import { FunctionComponent } from 'react';
import { TCustomRules } from '.';

type TFieldProps = {
	name: string;
	label: string;
	type: string;
	className?: string;
	customComponent?: FunctionComponent;
	rules: TSynergyRules;
	customRules?: TCustomRules;
	placeholder?: string;
};

export default TFieldProps;
