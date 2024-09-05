import {
	compact,
	each,
	every,
	filter,
	find,
	isEmpty,
	isFunction,
	map,
} from "lodash";
import {
	TCustomRules,
	TDropdownStore,
	TFieldComponentType,
	TFieldProps,
	TForm,
	TFormField,
	TRule,
	TSelectableItem,
	TSynergyFieldComponent,
} from "~/types";
import { generateRules } from "~/utils";
import { makeObservable, observable, action, computed } from "mobx";
import { v4 as uuidv4 } from "uuid";
import inputComponents from "~/components/inputComponents";
import MainModule from "~/main";
import { fieldTypeConstants } from "~/constants";
import { DropdownStore } from "~/stores";
import { FunctionComponent } from "react";

class FormField<TEntity> implements TFormField {
	private fieldProps: TFieldProps;
	private _component: TSynergyFieldComponent =
		inputComponents.TextInput as TSynergyFieldComponent;
	private onChangeCallbacks: Array<Function> = [];

	form: TForm = {} as TForm;
	id: string;
	value: any;
	entity: TEntity;
	rules: Array<TRule> = [];
	dropdownStore?: TDropdownStore;
	items: Array<TSelectableItem>;
	dependencies: string[];
	customComponent: FunctionComponent | undefined;
	placeholder: string | undefined;
	name: string;
	type: TFieldComponentType;
	label: string;
	initialValue: any;

	constructor(fieldProps: TFieldProps, entity: TEntity, form: TForm) {
		makeObservable(this, {
			value: observable,
			rules: observable,
			items: observable,

			setValue: action,
			onChange: action,
			setRules: action,
			setItems: action,

			isValid: computed,
			error: computed,
			errors: computed,
		});
		this.fieldProps = fieldProps;
		this.entity = entity;
		this.id = uuidv4();
		this.form = form;
		this.value = this.entity[this.fieldProps.name as keyof TEntity];
		this.initialValue = this.value;
		const { dependencies, customComponent, placeholder, label, name, type } =
			this.fieldProps;
		this.dependencies = dependencies || [];
		this.customComponent = customComponent;
		this.placeholder = placeholder;
		this.label = label;
		this.name = name;
		this.type = type;
		this.setItems((this.items = this.fieldProps.items || []));
		this.setRules(fieldProps.rules, fieldProps.customRules);
		this.initialize();
	}

	hasChanged() {
		return this.value !== this.initialValue;
	}

	get hideField() {
		const hideField = this.fieldProps.hideField;
		return isFunction(hideField) ? hideField(this.form.values) : hideField;
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

	get component(): TSynergyFieldComponent {
		return this._component;
	}

	setItems(items: Array<TSelectableItem>) {
		this.items = items;
	}

	private initialize() {
		this._component = this.customComponent || MainModule.components[this.type];
		switch (this.type) {
			case fieldTypeConstants.dropdown: {
				if (!isFunction(this.fieldProps.getItems) && isEmpty(this.items)) break;
				this.dropdownStore = new DropdownStore({
					getItems: this.fieldProps.getItems,
					setValue: this.setValue,
					items: this.items,
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
		let value: any = e.target.value;
		switch (this.type) {
			case fieldTypeConstants.radio: {
				this.setItems(
					map(this.items, (i) => {
						i.isSelected = i.id == e.target.id;
						return i;
					})
				);
				const item = find(this.items, (i) => i.isSelected) as TSelectableItem;
				value = item.value;
				break;
			}
			case fieldTypeConstants.checkbox: {
				this.setItems(
					map(this.items, (item) => {
						if (item.id == e.target.id) {
							item.isSelected = !item.isSelected;
						}
						return item;
					})
				);
				value = filter(this.items, (item) => item.isSelected);
			}
		}
		this.setValue(value);
		each(this.onChangeCallbacks, (onChangeCallback) => {
			isFunction(onChangeCallback) && onChangeCallback(this);
		});
	};

	addOnChangeCallback = (onChangeCallback: Function) => {
		this.onChangeCallbacks.push(onChangeCallback);
	};

	setRules(rules?: TSynergyRules, customRules?: TCustomRules | undefined) {
		if (!rules) rules = {};
		this.rules = generateRules(rules, customRules, this);
	}
}

export default FormField;
