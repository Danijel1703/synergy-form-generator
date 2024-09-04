import { each, isEmpty, isFunction } from "lodash";
import inputComponents from "~/components/inputComponents";
import {
	TFieldComponentType,
	TSynergyFieldComponent,
	TSynergyRule,
} from "./types";
import TMainModule from "./types/TMainModule";
import { validators } from "./utils/form/validators";

class MainModule implements TMainModule {
	components: { [key: string]: TSynergyFieldComponent };
	validators: {
		[key: TSynergyRule]: (values: any) => {
			isValid: boolean;
			error: string | undefined;
		};
	} = {};

	constructor() {
		this.components = inputComponents;
		this.validators = validators;
	}

	setComponents(components: { [key: string]: TSynergyFieldComponent }) {
		this.components = components;
		each(inputComponents, (value, key) => {
			if (!isFunction(this.components[key])) this.components[key] = value;
		});
	}

	replaceRule({
		name,
		validator,
	}: {
		name: TSynergyRule;
		validator: (values: any) => { isValid: boolean; error: string | undefined };
	}) {
		this.validators[name] = validator;
	}

	setRules = (
		rules: Array<{
			name: TSynergyRule;
			validator: (values: any) => {
				isValid: boolean;
				error: string | undefined;
			};
		}>
	) =>
		each(rules, ({ name, validator }) => (this.validators[name] = validator));

	replaceComponent(
		name: TFieldComponentType,
		component: TSynergyFieldComponent
	) {
		this.components[name] = component;
	}
}

export default new MainModule() as MainModule;
