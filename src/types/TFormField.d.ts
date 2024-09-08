import { ChangeEventHandler } from "react";
import {
	TDropdownStore,
	TFieldComponentType,
	TForm,
	TRule,
	TSelectableItem,
	TSynergyFieldComponent,
} from ".";

interface TFormField {
	/**
	 * The unique name identifier for the field.
	 */
	name: string;

	/**
	 * The label to display for the field.
	 */
	label: string;

	/**
	 * The type of the field component (e.g., text, dropdown, etc.).
	 */
	type: TFieldComponentType;

	/**
	 * The value of the field.
	 */
	value: any;

	/**
	 * Event handler for changes in the field's value.
	 */
	onChange: ChangeEventHandler<HTMLInputElement>;

	/**
	 * The custom component used to render the field.
	 */
	component: TSynergyFieldComponent;

	/**
	 * The unique identifier for the field.
	 */
	id: string;

	/**
	 * Adds a callback function to be executed when the field value changes.
	 * @param func The callback function to add.
	 */
	addOnChangeCallback: (func: Function) => void;

	/**
	 * Indicates whether the field is valid based on its rules and state.
	 */
	isValid: boolean;

	/**
	 * The error message associated with the field, if any.
	 */
	error: string | undefined;

	/**
	 * An array of field names that this field depends on for its validation or visibility.
	 */
	dependencies: Array<string>;

	/**
	 * An array of validation rules applied to the field.
	 */
	rules: Array<TRule>;

	/**
	 * The form that this field belongs to.
	 */
	form: TForm;

	/**
	 * An array of errors associated with the field, each including an error message and the rule that caused it.
	 */
	errors: Array<{ error: string; rule: string }>;

	/**
	 * Store for managing dropdown options and state, if applicable.
	 */
	dropdownStore?: TDropdownStore;

	/**
	 * Determines whether the field should be hidden.
	 */
	hideField?: boolean;

	/**
	 * A static array of selectable items used for dropdowns or radio fields.
	 */
	items?: Array<TSelectableItem>;

	/**
	 * Checks if the field's value has changed from its initial state.
	 * @returns true if the value has changed, otherwise false.
	 */
	hasChanged: () => boolean;

	/**
	 * CSS class to apply specifically to the field container.
	 */
	fieldClassName?: string;

	/**
	 * CSS class to apply to the field label.
	 */
	labelClassName?: string;

	/**
	 * CSS class to apply to the error message container.
	 */
	errorClassName?: string;

	/**
	 * CSS class to apply to the field input element.
	 */
	inputClassName?: string;

	/**
	 * Clears the field's value
	 */
	clear: () => void;

	/**
	 * Resets the field's value
	 */
	reset: () => void;

	/**
	 * Disables the field, making it unmodifiable.
	 */
	disable: () => void;

	/**
	 * Enables the field, making it modifiable.
	 */
	enable: () => void;

	/**
	 * Indicates whether the field is currently disabled.
	 */
	disabled: boolean;

	/**
	 * Placeholder text to display in the field input, if any.
	 */
	placeholder: string | undefined;

	/**
	 * Sets the validation rules for the field.
	 */
	setRules: () => void;

	/**
	 * Appends callbacks for dependencies to the field.
	 */
	appendDependecyCallbacks: () => void;

	/**
	 * An array of objects that specify fields to update when a certain field's value changes.
	 * Each object contains:
	 * - `name`: The name of the field that will be updated.
	 * - `updateFunc`: A function that receives the current form values and returns the updated value for the specified field.
	 */
	fieldsToUpdateOnChange?: Array<{
		/**
		 * The name of the field that will be updated when a change occurs.
		 */
		name: string;

		/**
		 * A function that takes the current form values and returns the updated value for the field.
		 * @param values - The current values of the form.
		 * @returns The updated value for the specified field.
		 */
		updateFunc: (values: any) => any;
	}>;
}

export default TFormField;
