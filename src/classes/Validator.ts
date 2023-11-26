import { computed, makeObservable } from 'mobx';
import { TFormField } from '~/types';

class Validator {
	field: TFormField;
	validator: (value: any) => {
		isValid: boolean;
		error: string | undefined;
	};

	constructor(
		validator: (value: any) => {
			isValid: boolean;
			error: string | undefined;
		},
		field: TFormField
	) {
		makeObservable(this, {
			value: computed,
		});
		this.field = field;
		this.validator = validator;
	}

	get value() {
		return this.field.value;
	}

	get isValid() {
		return this.validator(this.value).isValid;
	}

	get error() {
		return this.validator(this.value).error;
	}
}

export default Validator;
