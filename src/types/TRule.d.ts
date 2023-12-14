interface TRule {
	name: string;
	isActive: boolean | ((values: any) => boolean);
	isValid: boolean;
	error: string | undefined;
	dependencies: Array<string>;
	appendDependecyCallbacks: Function;
}

export default TRule;
