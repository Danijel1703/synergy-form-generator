type TRule = {
	name: string;
	isActive: boolean;
	isValid: boolean;
	error: string | undefined;
	dependencies: Array<string>;
	appendDependecyCallbacks: Function;
};

export default TRule;
