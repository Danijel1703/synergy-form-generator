import { action, makeObservable, observable } from "mobx";
import { FunctionComponent } from "react";
import inputComponents from "~/components/inputComponents";
import TMainModule from "./types/TMainModule";
import { TCustomRules } from "./types";

class MainModule implements TMainModule {
	components: { [key: string]: FunctionComponent };
	rules: Array<TCustomRules> = [];

	constructor() {
		this.components = inputComponents;
		makeObservable(this, {
			setComponents: action,
			replaceComponent: action,
			components: observable,
		});
	}

	setComponents(components: { [key: string]: FunctionComponent }) {
		this.components = components;
	}

	setRules(rules: TCustomRules) {}

	replaceComponent({
		name,
		component,
	}: {
		name: string;
		component: FunctionComponent;
	}) {
		this.components[name] = component;
	}
}

export default new MainModule() as MainModule;
