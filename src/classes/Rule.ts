import { each, isEmpty, isFunction } from "lodash";
import { action, makeObservable } from "mobx";
import { TFormField, TRule } from "synergy-form-generator/types";
import { Validator } from ".";

type RuleConfig = {
	name: string;
	validator: (value: any) => {
		isValid: boolean;
		error: string | undefined;
	};
	isActive: boolean | ((values: any) => boolean);
	dependencies?: Array<string>;
	compareValue?:
		| RegExp
		| number
		| string
		| Array<any>
		| ((values: any) => RegExp | number | string | Array<any>);
};

class Rule extends Validator implements TRule {
	name: string = "";
	getIsActive: (value: any) => boolean = () => true;
	dependencies: Array<string> = [];

	constructor(
		{ name, isActive, validator, dependencies, compareValue }: RuleConfig,
		field: TFormField
	) {
		super(validator, field, compareValue);
		this.name = name;
		this.dependencies = dependencies;
		makeObservable(this, {
			setIsActive: action,
		});
		if (isFunction(isActive)) {
			this.getIsActive = isActive;
			this.setIsActive(this.getIsActive(field.form.values));
			this.addFieldCallback();
		} else {
			this.setIsActive(isActive);
		}
		this.initialize();
	}

	setIsActive(isActive: boolean) {
		this.isActive = isActive;
	}

	addFieldCallback() {
		this.field.addOnChangeCallback((field: TFormField) => {
			this.setIsActive(this.getIsActive(field.form.values));
		});
	}

	appendDependecyCallbacks() {
		if (isEmpty(this.dependencies)) return;
		each(this.dependencies, (dependency) => {
			const dependencyField = this.field.form.fields[dependency] as TFormField;
			dependencyField.addOnChangeCallback(() => {
				this.setIsActive(this.getIsActive(this.field.form.values));
				this.validate();
				if (!this.field.hasChanged()) this.clearError();
			});
		});
	}
}

export default Rule;
