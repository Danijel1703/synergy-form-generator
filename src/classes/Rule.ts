import { isBoolean, isFunction } from "lodash";
import { TFormField } from "~/types";
import { Validator } from ".";
import { action, makeObservable } from "mobx";

type RuleConfig = {
	name: string;
	validator: (value: any) => {
		isValid: boolean;
		error: string | undefined;
	};
	isActive: boolean | ((values: any) => boolean);
};

class Rule extends Validator {
	name: string = "";
	getIsActive: (value: any) => boolean = () => false;

	constructor({ name, isActive, validator }: RuleConfig, field: TFormField) {
		super(validator, field);
		this.name = name;
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
	}

	setIsActive(isActive: boolean) {
		this.isActive = isActive;
	}

	addFieldCallback() {
		this.field.addOnChangeCallback((field: TFormField) => {
			this.setIsActive(this.getIsActive(field.form.values));
		});
	}
}

export default Rule;
