import MainModule from "~/main";
import { TFieldComponentType, TSynergyFieldComponent } from "~/types";

const replaceComponent = (
	name: TFieldComponentType,
	component: TSynergyFieldComponent
) => MainModule.replaceComponent(name, component);

export default replaceComponent;
