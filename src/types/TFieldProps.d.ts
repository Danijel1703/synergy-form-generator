import { FunctionComponent } from "react";
import {
	TCustomRules,
	TFieldComponentType,
	TGeTSelectableItemsFunc,
	TSelectableItem,
	TSynergyRules,
} from ".";

type TFieldProps = {
	name: string;
	label: string;
	type: TFieldComponentType;
	className?: string;
	customComponent?: FunctionComponent;
	rules?: TSynergyRules;
	customRules?: TCustomRules;
	placeholder?: string;
	dependencies?: Array<string>;
	getItems?: TGeTSelectableItemsFunc;
	hideField?: boolean | ((values: any) => boolean);
	items?: Array<TSelectableItem>;
	fieldClassName?: string;
	labelClassName?: string;
	errorClassName?: string;
	inputClassName?: string;
};

export default TFieldProps;
