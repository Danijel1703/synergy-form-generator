import {
	compact,
	concat,
	each,
	every,
	filter,
	find,
	first,
	head,
	isFunction,
	map,
} from 'lodash';
import { FunctionComponent } from 'react';
import { TCustomRules, TFieldProps, TForm, TFormField, TRule } from '~/types';
import { generateRules } from '~/utils';
import { makeObservable, observable, action, computed } from 'mobx';
import { v4 as uuidv4 } from 'uuid';
import inputComponents from '~/components/inputComponents';
import MainModule from '~/main';

class FormField<TEntity> {
	private fieldProps: TFieldProps;
	private _component: FunctionComponent =
		inputComponents.TextInput as FunctionComponent;
	private onChangeCallbacks: Array<Function> = [];

	form: TForm = {} as TForm;
	id: string;
	value: any;
	entity: TEntity;
	rules: Array<TRule> = [];

	constructor(fieldProps: TFieldProps, entity: TEntity) {
		makeObservable(this, {
			value: observable,
			onChange: action,
			rules: observable,
			setRules: action,
			isValid: computed,
			error: computed,
		});
		this.fieldProps = fieldProps;
		this.entity = entity;
		this.id = uuidv4();
		this.value = this.entity[this.fieldProps.name as keyof TEntity];
		this.onChange = this.onChange.bind(this);
		this.setRules(fieldProps.rules, fieldProps.customRules);
		this.initialize();
	}

	get customComponent() {
		return this.fieldProps.customComponent;
	}

	get placeholder() {
		return this.fieldProps.placeholder;
	}

	get label() {
		return this.fieldProps.label;
	}

	get type() {
		return this.fieldProps.type;
	}

	get name() {
		return this.fieldProps.name;
	}

	get isValid() {
		return every(this.rules, (rule) => rule.isValid);
	}

	get error() {
		const rule: any = find(this.rules, (rule) => rule.error);
		return rule?.error;
	}

	get errors() {
		return compact(
			map(this.rules, (rule) => {
				if (rule.error) {
					return { rule: rule.name, error: rule.error };
				}
			})
		);
	}

	get component(): FunctionComponent {
		return this._component;
	}

	private initialize() {
		this._component = this.customComponent || MainModule.components[this.type];
	}

	setValue(value: any) {
		this.value = value;
		this.entity[this.name as keyof TEntity] = value;
	}

	onChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setValue(e.target.value);
		each(this.onChangeCallbacks, (onChangeCallback) => {
			isFunction(onChangeCallback) && onChangeCallback(this);
		});
		console.log(this.form.errors);
	}

	addOnChangeCallback = (onChangeCallback: Function) => {
		this.onChangeCallbacks.push(onChangeCallback);
	};

	addFormReference(form: TForm) {
		this.form = form;
	}

	setRules(rules: TSynergyRules, customRules: TCustomRules | undefined) {
		this.rules = generateRules(rules, customRules, this as TFormField);
	}
}

export default FormField;
