import { computed, makeObservable, observable } from "mobx";
import { TFormField } from "~/types";

class Validator {
	field: TFormField;
	validator: (value: any) => {
		isValid: boolean;
		error: string | undefined;
	};
	isActive: ((value: any) => boolean) | boolean = false;

	constructor(
		validator: (value: any) => {
			isValid: boolean;
			error: string | undefined;
		},
		field: TFormField
	) {
		makeObservable(this, {
			value: computed,
			error: computed,
			isValid: computed,
			isActive: observable,
		});
		this.field = field;
		this.validator = validator;
	}

	async validate(value: any) {
		const result = this.validator(value);
		if (result instanceof Promise) {
			const validation = await result;
			return validation;
		} else {
			return result;
		}
	}

	get value() {
		return this.field.value;
	}

	get isValid() {
		if (!this.isActive) return true;
		const value = this.value;
		return (async () => await this.validator(value).isValid)();
	}

	get error() {
		if (!this.isActive) return undefined;
		const value = this.value;
		return (async () => await this.validator(value).error)();
	}
}

export default Validator;
