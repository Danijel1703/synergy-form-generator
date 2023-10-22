import { each, every, filter, isEmpty, keys } from 'lodash';
import { TFieldProps, TFormField } from '~/types';
import { FormField } from '~/classes';
import { computed, makeObservable } from 'mobx';

type TOptions = {
	formTemplate: string;
};

type TForm = {
	fields: { [key: string]: TFormField };
	values: Function;
};

class Form<TEntity> {
	defaultOptions: TOptions = {
		formTemplate: 'default',
	};
	private _form: TForm = { fields: {}, values: () => {} };
	private entity: TEntity | any;
	options: TOptions = this.defaultOptions;
	formFields: Array<TFieldProps>;
	onSubmit: Function;

	constructor(
		EntityClass: new () => TEntity,
		formFields: Array<TFieldProps>,
		onSubmit: Function,
		options?: TOptions,
		entity?: TEntity
	) {
		this.initializeEntity(EntityClass, entity);
		this.formFields = formFields;
		this.options = { ...this.defaultOptions, ...options };
		this.onSubmit = onSubmit;
		this.generateForm();
		this.values = this.values.bind(this);
		makeObservable(this, {
			isValid: computed,
		});
	}

	get isValid() {
		return every(this.form.fields, (formField) => formField.isValid);
	}

	get form() {
		return this._form;
	}

	values = () => {
		const val: any = {};
		each(this.form.fields, (formField: TFormField) => {
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
		each(this.formFields, (formField: TFieldProps) => {
			const field = new FormField<TEntity>(formField, this.entity);
			this.form.fields[field.name] = field;
		});
		this.form.values = this.values;
		this.addFieldFormReference();
		this.addOnChangeCallback();
	}

	private addOnChangeCallback() {
		const fieldsWithDynamicRules = filter(keys(this.form.fields), (field) => {
			const f = this.form.fields[field] as TFormField;
			if (!isEmpty(f.dynamicRules)) {
				return f;
			}
		});
		if (!isEmpty(fieldsWithDynamicRules)) {
			each(keys(this.form.fields), (field) => {
				const f = this.form.fields[field] as TFormField;
				f.addOnChangeCallback(() => {
					each(fieldsWithDynamicRules, (field) => {
						const fieldWithDynamicRules =
							this.form.fields[field as keyof TForm];
						fieldWithDynamicRules.toggleDynamicRules(
							fieldWithDynamicRules.dynamicRules
						);
						fieldWithDynamicRules.validate();
					});
				});
			});
		}
	}

	private addFieldFormReference() {
		each(this.form.fields, (field) => {
			field.addFormReference(this.form);
		});
	}
}

export default Form;
