import { each, every, isEmpty, keys, map } from 'lodash';
import { TFieldProps, TForm, TFormField, TOptions } from '~/types';
import { FormField } from '~/classes';
import { computed, makeObservable } from 'mobx';

class FormGenerator<TEntity> {
	private defaultOptions: TOptions = {
		formTemplate: 'default',
		clearErrorsOnEmptyForm: false,
	};
	private entity: TEntity | any;
	private fieldProps: Array<TFieldProps>;
	private _form: TForm = { fields: {}, values: () => {}, errors: [] };
	options: TOptions = this.defaultOptions;
	onSubmit: Function;

	constructor(
		EntityClass: new () => TEntity,
		fieldProps: Array<TFieldProps>,
		onSubmit: Function,
		options?: TOptions,
		entity?: TEntity
	) {
		makeObservable(this, {
			errors: computed,
		});
		this.initializeEntity(EntityClass, entity);
		this.fieldProps = fieldProps;
		this.options = { ...this.defaultOptions, ...options };
		this.onSubmit = onSubmit;
		this.generateForm();
		this.values = this.values.bind(this);
	}

	get isValid() {
		return every(this._form.fields, (formField) => formField.isValid);
	}

	get errors() {
		return map(this._form.fields, (field) => ({
			field: field.name,
			errors: field.errors,
		}));
	}

	get form() {
		return this._form;
	}

	values = () => {
		const val: any = {};
		each(this._form.fields, (formField: TFormField) => {
			val[formField.name] = formField.value;
		});
		return val;
	};

	private initializeEntity(
		EntityClass: new () => TEntity,
		entity: TEntity | undefined
	) {
		if (isEmpty(this.entity)) {
			this.entity = new EntityClass();
		} else {
			this.entity = entity;
		}
	}

	private generateForm() {
		each(this.fieldProps, (formField: TFieldProps) => {
			const field = new FormField<TEntity>(formField, this.entity);
			this._form.fields[field.name] = field as TFormField;
		});
		this._form.values = this.values;
		this.addFieldFormReference();
		each(keys(this._form.fields), (key) =>
			Object.freeze(this._form.fields[key])
		);
	}

	private addFieldFormReference() {
		each(this._form.fields, (field) => {
			field.addFormReference(this._form);
		});
	}
}

export default FormGenerator;
