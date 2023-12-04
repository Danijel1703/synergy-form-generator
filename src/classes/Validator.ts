import { action, computed, makeObservable, observable } from "mobx";
import { TFormField } from "~/types";

class Validator {
	field: TFormField;
	validator: (value: any) => {
		isValid: boolean;
		error: string | undefined;
	};
	isActive: ((value: any) => boolean) | boolean = false;
	_isValid: boolean = false;
	_error: string | undefined;

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
			validate: action,
			_isValid: observable,
			_error: observable,
			isActive: observable,
		});
		this.field = field;
		this.validator = validator;
	}

	async validate(value: any) {
		const result = this.validator(value);
		if (result instanceof Promise) {
			try {
				const validation = await result;
				this._isValid = validation.isValid;
				this._error = validation.error;
			} catch (error) {
				if (error) console.error(error);
				this._isValid = false;
				this._error = "Unexpected error ocurred";
			}
		} else {
			this._isValid = result.isValid;
			this._error = result.error;
		}
	}

	get value() {
		return this.field.value;
	}

	get isValid() {
		if (!this.isActive) return true;
		this.validate(this.value);
		return this._isValid;
	}

	get error() {
		if (!this.isActive) return undefined;
		this.validate(this.value);
		return this._error;
	}
}

export default Validator;
