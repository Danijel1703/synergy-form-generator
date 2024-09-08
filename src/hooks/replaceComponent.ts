import MainModule from "synergy-form-generator/MainModule";
import {
	TFieldComponentType,
	TSynergyFieldComponent,
} from "synergy-form-generator/types";

const replaceComponent = (
	type: TFieldComponentType,
	component: TSynergyFieldComponent
) => MainModule.replaceComponent(type, component);

export default replaceComponent;
