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
		[key: TSynergyRule]: (values: any) => {
			isValid: boolean;
			error: string | undefined;
		};
	};
}

export default TMainModule;
