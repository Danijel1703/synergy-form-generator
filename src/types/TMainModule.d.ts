import { FunctionComponent } from "react";
import { TFieldComponentType, TSynergyFieldComponent, TSynergyRule } from ".";

interface TMainModule {
	setComponents: (components: {
		[key: string]: TSynergyFieldComponent;
	}) => void;
	replaceRule: ({
		name,
		validator,
	}: {
		name: TSynergyRule;
		validator: (values: any) => { isValid: boolean; error: string | undefined };
	}) => void;
	setRules: (
		rules: Array<{
			name: TSynergyRule;
			validator: (values: any) => {
				isValid: boolean;
				error: string | undefined;
			};
		}>
	) => void;
	replaceComponent: (
		name: TFieldComponentType,
		component: FunctionComponent
	) => void;
	validators: {
		[key: string]: (
			values: any,
			compareValue: any
		) => {
			isValid: boolean;
			error: string | undefined;
		};
	};
	errorConstants: { [key: string]: string };
}

export default TMainModule;
