import {
	action,
	computed,
	makeObservable,
	observable,
	reaction,
	runInAction,
} from "mobx";
import { errorConstants } from "synergy-form-generator/constants";
import { TFormField, TValidator } from "synergy-form-generator/types";

class Validator implements TValidator {
	field: TFormField;
	validator: (
		field: TFormField,
		compareValue?: any
	) => {
		isValid: boolean;
		error: string | undefined;
	};
	isActive: ((value: any) => boolean) | boolean = false;
	_isValid: boolean = false;
	_error: string | undefined;
	compareValue?: any;

	constructor(
		validator: (
			field: TFormField,
			compareValue: any
		) => {
			isValid: boolean;
			error: string | undefined;
		},
		field: TFormField,
		compareValue?: RegExp | number | string | Array<any>
	) {
		makeObservable(this, {
			value: computed,
			error: computed,
			isValid: computed,
			_isValid: observable,
			_error: observable,
			isActive: observable,
			clearError: action,
		});
		this.compareValue = compareValue;
		this.field = field;
		this.validator = validator;
		reaction(
			() => this.value,
			async () => {
				await this.validate();
			}
		);
	}

	clearError() {
		this._error = undefined;
	}

	initialize = async () => {
		await this.validate();
	};

	async validate() {
		if (!this.isActive) {
			runInAction(() => {
				this._isValid = true;
				this._error = undefined;
			});
			return;
		}
		const result = this.validator(this.field, this.compareValue);
		if (result instanceof Promise) {
			try {
				const validation = await result;
				runInAction(() => {
					this._isValid = validation.isValid;
					this._error = validation.error;
				});
			} catch (error) {
				if (error) console.error(error);
				runInAction(() => {
					this._isValid = false;
					this._error = errorConstants.unexpectedError;
				});
			}
		} else {
			runInAction(() => {
				this._isValid = result.isValid;
				this._error = result.error;
			});
		}
	}

	get value() {
		return this.field.value;
	}

	get isValid() {
		return this._isValid;
	}

	get error() {
		return this._error;
	}
}

export default Validator;
