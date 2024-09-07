type CustomRule = {
	/**
	 * The name identifier for the custom rule.
	 */
	name: string;

	/**
	 * A function that validates the form values against the rule.
	 * Returns an object with `isValid` indicating if the validation passed, and `error` containing an error message if validation failed.
	 */
	validator: (values: any) => {
		isValid: boolean;
		error: string | undefined;
	};

	/**
	 * Determines whether the rule is active.
	 * Can be a boolean value or a function that receives the form values and returns a boolean indicating if the rule should be applied.
	 */
	isActive: boolean | ((formValues: any) => boolean);
};

/**
 * An array of custom validation rules.
 */
type TCustomRules = Array<CustomRule>;

export default TCustomRules;
