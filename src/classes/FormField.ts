import {
	compact,
	each,
	every,
	filter,
	find,
	isBoolean,
	isEmpty,
	isFunction,
	map,
	some,
	toNumber,
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
	TSynergyRules,
} from "synergy-form-generator/types";
import { generateRules } from "synergy-form-generator/utils";
import { makeObservable, observable, action, computed } from "mobx";
import { v4 as uuidv4 } from "uuid";
import inputComponents from "synergy-form-generator/components/inputComponents";
import MainModule from "synergy-form-generator/MainModule";
import {
	fieldTypeConstants,
	ruleConstants,
} from "synergy-form-generator/constants";
import { DropdownStore } from "synergy-form-generator/stores";
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
	inputClassName?: string;
	fieldClassName?: string;
	errorClassName?: string;
	labelClassName?: string;
	disabled: boolean = false;
	hideField: boolean = false;
	getIsHidden?: Function;

	constructor(fieldProps: TFieldProps, entity: TEntity, form: TForm) {
		makeObservable(this, {
			value: observable,
			rules: observable,
			items: observable,
			disabled: observable,
			hideField: observable,

			setHideField: action,
			setValue: action,
			setRules: action,
			setItems: action,
			setDisabled: action,

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
		const {
			dependencies,
			customComponent,
			placeholder,
			label,
			name,
			type,
			inputClassName,
			fieldClassName,
			errorClassName,
			labelClassName,
			watch,
		} = this.fieldProps;
		this.onChangeCallbacks.push(watch);
		this.dependencies = dependencies || [];
		this.customComponent = customComponent;
		this.placeholder = placeholder;
		this.label = label;
		this.name = name;
		this.type = type;
		this.inputClassName = inputClassName;
		this.fieldClassName = fieldClassName;
		this.errorClassName = errorClassName;
		this.labelClassName = labelClassName;
		if (isBoolean(this.fieldProps.hideField)) {
			this.setHideField(this.fieldProps.hideField);
		} else if (isFunction(this.fieldProps.hideField)) {
			this.getIsHidden = this.fieldProps.hideField;
			this.setHideField(this.getIsHidden(this.form.values));
		}
		this.setItems((this.items = this.fieldProps.items || []));
		this.setRules(fieldProps.rules, fieldProps.customRules);
		this.initialize();
	}

	hasChanged() {
		return this.value !== this.initialValue;
	}

	setHideField(hideField: boolean) {
		this.hideField = hideField;
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

	get isRequired() {
		return some(this.rules, (rule) => rule.name === ruleConstants.required);
	}

	get component(): TSynergyFieldComponent {
		return this._component;
	}

	setItems(items: Array<TSelectableItem>) {
		this.items = items;
	}

	reset = () => this.setValue(this.initialValue);

	clear = () => this.setValue(undefined);

	setDisabled(disabled: boolean) {
		this.disabled = disabled;
	}

	disable = () => this.setDisabled(true);

	enable = () => this.setDisabled(false);

	private initialize() {
		this._component = this.customComponent || MainModule.components[this.type];
		switch (this.type) {
			case fieldTypeConstants.dropdown: {
				if (!isFunction(this.fieldProps.getItems) && isEmpty(this.items)) break;
				this.dropdownStore = new DropdownStore({
					getItems: this.fieldProps.getItems,
					setValue: this.setValue,
					items: this.items,
					filter: this.fieldProps.filter,
					updateFilter: this.fieldProps.updateFilter,
				});
				break;
			}
		}
	}

	setValue(value: any) {
		this.value = value;
		this.entity[this.name as keyof TEntity] = value;
	}

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
				break;
			}
			case fieldTypeConstants.phone:
			case fieldTypeConstants.number: {
				value = toNumber(value);
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

	appendDependecyCallbacks = () => {
		each(this.dependencies, (dependency) => {
			const dependencyField = this.form.fields[dependency] as TFormField;
			dependencyField.addOnChangeCallback(() => {
				if (isFunction(this.getIsHidden)) {
					this.setHideField(this.getIsHidden(this.form.values));
				}
			});
		});
	};

	setRules(rules?: TSynergyRules, customRules?: TCustomRules | undefined) {
		if (!rules) rules = {};
		this.rules = generateRules(rules, customRules, this);
	}
}

export default FormField;
