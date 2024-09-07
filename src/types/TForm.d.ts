import { TFormField, TOptions } from ".";

interface TForm {
	/**
	 * A dictionary of form fields indexed by their names.
	 */
	fields: { [key: string]: TFormField };

	/**
	 * An array of error objects, each containing the field name and an array of errors associated with that field.
	 */
	errors: Array<{
		/**
		 * The name of the field with errors.
		 */
		field: string;

		/**
		 * An array of errors for the field, where each error includes a rule and the associated error message.
		 */
		errors: Array<{ rule: string; error: string }>;
	}>;

	/**
	 * Options associated with the form, such as configuration settings.
	 */
	options: TOptions;

	/**
	 * Function to be called when the form is submitted.
	 */
	onSubmit: Function;

	/**
	 * Indicates whether the form is valid based on its fields and validation rules.
	 */
	isValid: boolean;

	/**
	 * A dictionary of form values indexed by their field names.
	 */
	values: { [key: string]: any };

	/**
	 * The entity associated with the form, which can hold data or context relevant to the form.
	 */
	entity: any;

	/**
	 * Adds a new field to the form.
	 * @param field The field to add.
	 */
	addField: (field: TFormField) => void;

	/**
	 * Checks if any of the form's values have been changed from their initial state.
	 * @returns True if any values have changed, otherwise false.
	 */
	hasChanged: () => boolean;

	/**
	 * Clears all values from the form
	 */
	clear: () => void;

	/**
	 * Resets form values to its initial state
	 */
	reset: () => void;

	/**
	 * Disables form fields
	 */
	disable: () => void;

	/**
	 * Enables form fields
	 */
	enable: () => void;

	/**
	 * Clears all validation errors from the form.
	 */
	clearErrors: () => void;
}

export default TForm;
