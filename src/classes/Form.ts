import { each, every, isEmpty, keys, map, some } from "lodash";
import {
	TFieldProps,
	TForm,
	TFormField,
	TOptions,
} from "synergy-form-generator/types";
import { FormField } from "synergy-form-generator/classes";
import { computed, makeObservable } from "mobx";

class Form<TEntity> implements TForm {
	private defaultOptions: TOptions = {
		clearInitialErrors: true,
	};
	private fieldProps: Array<TFieldProps>;

	entity: TEntity | any;
	options: TOptions = this.defaultOptions;
	onSubmit: Function;
	fields: { [key: string]: TFormField } = {};

	constructor(
		fieldProps: Array<TFieldProps>,
		onSubmit: Function,
		options?: TOptions,
		entity?: TEntity,
		EntityClass?: new () => TEntity
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

	hasChanged() {
		return some(keys(this.fields), (key) => this.fields[key].hasChanged());
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
		EntityClass: (new () => TEntity) | undefined,
		entity: TEntity | undefined
	) {
		if (isEmpty(this.entity)) {
			this.entity = EntityClass ? new EntityClass() : {};
		} else {
			this.entity = entity;
		}
	}

	private generateFields() {
		each(this.fieldProps, (formField: TFieldProps) => {
			const field = new FormField<TEntity>(formField, this.entity, this);
			this.fields[field.name] = field;
		});
		each(keys(this.fields), (key) => {
			each(this.fields[key].rules, (rule) => rule.appendDependecyCallbacks());
			Object.freeze(this.fields[key]);
		});
		if (this.options.clearInitialErrors) this.clearErrors();
	}

	clear = () => each(this.fields, (field) => field.clear());

	reset = () => each(this.fields, (field) => field.reset());

	disable = () => each(this.fields, (field) => field.disable());

	enable = () => each(this.fields, (field) => field.enable());

	clearErrors() {
		each(keys(this.fields), (key) =>
			each(this.fields[key].rules, (rule) => rule.clearError())
		);
	}

	addField = (field: TFormField) => {
		this.fields[field.name] = field;
		each(this.fields[field.name].rules, (rule) => {
			rule.appendDependecyCallbacks();
			rule.clearError();
		});
		Object.freeze(this.fields[field.name]);
	};
}

export default Form;
