import {
	compact,
	each,
	every,
	filter,
	find,
	first,
	isBoolean,
	isEmpty,
	isFunction,
	map,
	some,
	toNumber,
} from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import { FunctionComponent } from "react";
import inputComponents from "synergy-form-generator/components/inputComponents";
import {
	fieldTypeConstants,
	ruleConstants,
} from "synergy-form-generator/constants";
import MainModule from "synergy-form-generator/MainModule";
import { DropdownStore } from "synergy-form-generator/stores";
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
import { v4 as uuidv4 } from "uuid";

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
	fieldsToUpdateOnChange?: Array<{
		name: string;
		updateFunc: (values: any) => any;
	}> = [];
	isRequired: boolean = false;

	constructor(fieldProps: TFieldProps, entity: TEntity, form: TForm) {
		makeObservable(this, {
			value: observable,
			rules: observable,
			items: observable,
			disabled: observable,
			hideField: observable,
			isRequired: observable,

			setHideField: action,
			setValue: action,
			setRules: action,
			setItems: action,
			setDisabled: action,
			toggleIsRequired: action,

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
			fieldsToUpdateOnChange,
		} = this.fieldProps;
		this.fieldsToUpdateOnChange = fieldsToUpdateOnChange;
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

	toggleIsRequired() {
		this.isRequired = some(
			this.rules,
			(rule) => rule.name === ruleConstants.required && rule.isActive
		);
	}

	get component(): TSynergyFieldComponent {
		return this._component;
	}

	setItems(items: Array<TSelectableItem>) {
		this.items = items;
	}

	addOption(item: TSelectableItem) {
		this.setItems([...this.items, item]);
	}

	removeOption(item: TSelectableItem) {
		this.setItems(filter(this.items, (i) => i.id !== item.id));
	}

	reset = () => this.setValue(this.initialValue);

	clear = () => this.setValue(undefined);

	setDisabled(disabled: boolean) {
		this.disabled = disabled;
	}

	disable = () => this.setDisabled(true);

	enable = () => this.setDisabled(false);

	private initialize() {
		if (!this.type) {
			this.setHideField(true);
			return;
		}
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
				break;
			}
			case fieldTypeConstants.file: {
				value = first(e.target.files);
				break;
			}
		}
		this.setValue(value);
		each(this.onChangeCallbacks, (onChangeCallback) => {
			isFunction(onChangeCallback) && onChangeCallback(this);
		});
		if (!isEmpty(this.fieldsToUpdateOnChange)) {
			each(this.fieldsToUpdateOnChange, ({ name, updateFunc }) => {
				if (name === this.name) return;
				this.form.fields[name].onChange({
					target: { value: updateFunc(this.form.values) },
				} as React.ChangeEvent<HTMLInputElement>);
			});
		}
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
				this.toggleIsRequired();
			});
		});
	};

	setRules(rules?: TSynergyRules, customRules?: TCustomRules | undefined) {
		if (!rules) rules = {};
		this.rules = generateRules(rules, customRules, this);
	}
}

export default FormField;
