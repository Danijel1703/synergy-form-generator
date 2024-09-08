import { each, isFunction } from "lodash";
import inputComponents from "synergy-form-generator/components/inputComponents";
import { errorConstants } from "./constants";
import {
	TFieldComponentType,
	TSynergyFieldComponent,
	TSynergyRule,
} from "./types";
import TMainModule from "./types/TMainModule";
import { validators } from "./utils/validators";

class MainModule implements TMainModule {
	components: { [key: string]: TSynergyFieldComponent } = inputComponents;
	errorConstants: { [key: string]: string } = errorConstants;
	validators = validators as {
		[key: string]: (
			values: any,
			compareValue: any
		) => {
			isValid: boolean;
			error: string | undefined;
		};
	};

	setComponents(components: { [key: string]: TSynergyFieldComponent }) {
		this.components = components;
		each(inputComponents, (value, key) => {
			if (!isFunction(this.components[key])) this.components[key] = value;
		});
	}

	replaceError = (name: TSynergyRule, error: string) => {
		this.errorConstants[name] = error;
	};

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
		type: TFieldComponentType,
		component: TSynergyFieldComponent
	) {
		this.components[type] = component;
	}
}

export default new MainModule() as MainModule;
