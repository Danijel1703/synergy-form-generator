import { compact, each, every, find, isFunction, map } from "lodash";
import { FunctionComponent } from "react";
import {
	TCustomRules,
	TDropdownStore,
	TFieldProps,
	TForm,
	TFormField,
	TRule,
} from "~/types";
import { generateRules } from "~/utils";
import { makeObservable, observable, action, computed } from "mobx";
import { v4 as uuidv4 } from "uuid";
import inputComponents from "~/components/inputComponents";
import MainModule from "~/main";
import { fieldTypeConstants } from "~/constants";
import { DropdownStore } from "~/stores";

class FormField<TEntity> implements TFormField {
	private fieldProps: TFieldProps;
	private _component: FunctionComponent =
		inputComponents.TextInput as FunctionComponent;
	private onChangeCallbacks: Array<Function> = [];

	form: TForm = {} as TForm;
	id: string;
	value: any;
	entity: TEntity;
	rules: Array<TRule> = [];
	dropdownStore?: TDropdownStore;

	constructor(fieldProps: TFieldProps, entity: TEntity, form: TForm) {
		makeObservable(this, {
			value: observable,
			rules: observable,
			setValue: action,
			onChange: action,
			setRules: action,
			isValid: computed,
			error: computed,
			errors: computed,
		});
		this.fieldProps = fieldProps;
		this.entity = entity;
		this.id = uuidv4();
		this.form = form;
		this.value = this.entity[this.fieldProps.name as keyof TEntity];
		this.setRules(fieldProps.rules, fieldProps.customRules);
		this.initialize();
	}

	get hideField() {
		const hideField = this.fieldProps.hideField;
		return isFunction(hideField) ? hideField(this.form.values) : hideField;
	}

	get dependencies() {
		return this.fieldProps.dependencies || [];
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
		switch (this.type) {
			case fieldTypeConstants.dropdown: {
				if (!isFunction(this.fieldProps.getItems)) break;
				this.dropdownStore = new DropdownStore({
					getItems: this.fieldProps.getItems,
					setValue: this.setValue,
				});
				break;
			}
		}
	}

	setValue = (value: any) => {
		this.value = value;
		this.entity[this.name as keyof TEntity] = value;
	};

	onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		this.setValue(e.target.value);
		each(this.onChangeCallbacks, (onChangeCallback) => {
			isFunction(onChangeCallback) && onChangeCallback(this);
		});
	};

	addOnChangeCallback = (onChangeCallback: Function) => {
		this.onChangeCallbacks.push(onChangeCallback);
	};

	setRules(rules: TSynergyRules, customRules: TCustomRules | undefined) {
		this.rules = generateRules(rules, customRules, this);
	}
}

export default FormField;
