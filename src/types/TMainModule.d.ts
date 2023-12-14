import { FunctionComponent } from "react";

interface TMainModule {
	setComponents: (components: { [key: string]: FunctionComponent }) => void;
	replaceComponent: ({
		name,
		component,
	}: {
		name: string;
		component: FunctionComponent;
	}) => void;
}

export default TMainModule;
