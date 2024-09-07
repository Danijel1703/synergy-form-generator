import TValidator from "./TValidator";

interface TRule extends TValidator {
	name: string;
	isActive: boolean | ((values: any) => boolean);
	isValid: boolean;
	error: string | undefined;
	dependencies: Array<string>;
	appendDependecyCallbacks: () => void;
	clearError: () => void;
	validate: (value: any) => Promise<void>;
}

export default TRule;
