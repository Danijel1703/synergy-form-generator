import { FunctionComponent } from "react";
import { TCustomRules, TRule } from ".";

interface TMainModule {
	setComponents: (components: { [key: string]: FunctionComponent }) => void;
	replaceComponent: ({
		name,
		component,
	}: {
		name: string;
		component: FunctionComponent;
	}) => void;
	rules: Array<TCustomRules>;
}

export default TMainModule;
