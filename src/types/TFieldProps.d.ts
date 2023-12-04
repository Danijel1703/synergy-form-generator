import { FunctionComponent } from "react";
import { TCustomRules, TGetDropdownItemsFunc } from ".";

type TFieldProps = {
	name: string;
	label: string;
	type: string;
	className?: string;
	customComponent?: FunctionComponent;
	rules: TSynergyRules;
	customRules?: TCustomRules;
	placeholder?: string;
	dependencies: Array<string>;
	getItems?: TGetDropdownItemsFunc;
};

export default TFieldProps;
