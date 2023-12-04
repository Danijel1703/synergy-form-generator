import { each, every, isEmpty, keys, map } from "lodash";
import { TFieldProps, TForm, TFormField, TOptions } from "~/types";
import { FormField } from "~/classes";
import { computed, makeObservable } from "mobx";

class Form<TEntity> {
	private defaultOptions: TOptions = {
		formTemplate: "default",
		clearErrorsOnEmptyForm: false,
	};
	private entity: TEntity | any;
	private fieldProps: Array<TFieldProps>;

	options: TOptions = this.defaultOptions;
	onSubmit: Function;
	fields: { [key: string]: TFormField } = {};

	constructor(
		EntityClass: new () => TEntity,
		fieldProps: Array<TFieldProps>,
		onSubmit: Function,
		options?: TOptions,
		entity?: TEntity
	) {
		makeObservable(this, {
			isValid: computed,
			errors: computed,
			values: computed,
		});
		this.initializeEntity(EntityClass, entity);
		this.fieldProps = fieldProps;
		this.options = { ...this.defaultOptions, ...options };
		this.onSubmit = onSubmit;
		this.generateFields();
	}

	get isValid() {
		return every(this.fields, (formField) => formField.isValid);
	}

	get errors() {
		return map(this.fields, (field) => ({
			field: field.name,
			errors: field.errors,
		}));
	}

	get values() {
		const val: any = {};
		each(this.fields, (formField: TFormField) => {
			val[formField.name] = formField.value;
		});
		return val;
	}

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

	private generateFields() {
		each(this.fieldProps, (formField: TFieldProps) => {
			const field = new FormField<TEntity>(
				formField,
				this.entity,
				this as TForm
			);
			this.fields[field.name] = field as TFormField;
		});
		each(keys(this.fields), (key) => {
			each(this.fields[key].rules, (rule) => rule.appendDependecyCallbacks());
			Object.freeze(this.fields[key]);
		});
	}
}

export default Form;
