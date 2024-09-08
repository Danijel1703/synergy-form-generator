import { FunctionComponent } from "react";
import {
	TCustomRules,
	TFieldComponentType,
	TFormField,
	TGeTSelectableItemsFunc,
	TSelectableItem,
	TSynergyRules,
} from ".";

type TFieldProps = {
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
	 * A custom React component that can replace the default field component.
	 */
	customComponent?: FunctionComponent;

	/**
	 * Validation rules defined for the field (e.g., required, min length, etc.).
	 */
	rules?: TSynergyRules;

	/**
	 * Additional custom validation rules for the field.
	 */
	customRules?: TCustomRules;

	/**
	 * Placeholder text to display in the field input.
	 */
	placeholder?: string;

	/**
	 * Field dependencies for conditional behavior. Array of other field names that this field depends on.
	 */
	dependencies?: Array<string>;

	/**
	 * Function to fetch selectable items asynchronously or synchronously (e.g., for dropdowns).
	 * This function accepts the current filter and returns a promise of items.
	 */
	getItems?: TGeTSelectableItemsFunc;

	/**
	 * Determines whether the field should be hidden.
	 * Can be a boolean or a function that receives the form values and returns a boolean.
	 */
	hideField?: boolean | ((values: any) => boolean);

	/**
	 * A static array of selectable items used for dropdowns or radio fields.
	 */
	items?: Array<TSelectableItem>;

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
	 * Filter object that can be used to pass additional filter criteria for fetching items.
	 */
	filter?: any;

	/**
	 * Function to update the filter object. It receives the current filter, modifies it, and returns the new filter.
	 */
	updateFilter?: (filter: any) => any;

	/**
	 * Function that will be called each time Field value changes.
	 * It receives the field object and can perform actions based on changes.
	 */
	watch?: (field: TFormField) => void;

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
};

export default TFieldProps;
