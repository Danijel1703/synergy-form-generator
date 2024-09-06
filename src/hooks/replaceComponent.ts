import MainModule from "synergy-form-generator/MainModule";
import {
	TFieldComponentType,
	TSynergyFieldComponent,
} from "synergy-form-generator/types";

const replaceComponent = (
	name: TFieldComponentType,
	component: TSynergyFieldComponent
) => MainModule.replaceComponent(name, component);

export default replaceComponent;
