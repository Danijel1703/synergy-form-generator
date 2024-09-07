import TValidator from "./TValidator";

interface TRule extends TValidator {
	/**
	 * The unique name identifier for the rule.
	 */
	name: string;

	/**
	 * Determines whether the rule is active.
	 * Can be a boolean or a function that receives the form values and returns a boolean.
	 */
	isActive: boolean | ((values: any) => boolean);

	/**
	 * Indicates whether the rule is valid based on the current field value and state.
	 */
	isValid: boolean;

	/**
	 * The error message associated with the rule, if any.
	 */
	error: string | undefined;

	/**
	 * An array of field names that this rule depends on for its validation.
	 */
	dependencies: Array<string>;

	/**
	 * Appends callbacks for the rule's dependencies to ensure proper validation when dependencies change.
	 */
	appendDependecyCallbacks: () => void;

	/**
	 * Clears the error message associated with the rule.
	 */
	clearError: () => void;

	/**
	 * Validates the field value based on the rule.
	 * @param value The value to validate.
	 * @returns A promise that resolves when the validation is complete.
	 */
	validate: (value: any) => Promise<void>;
}

export default TRule;
