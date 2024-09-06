import { TSynergyFieldComponent } from "synergy-form-generator/types";
import MainModule from "synergy-form-generator/MainModule";

const setComponents = (components: { [key: string]: TSynergyFieldComponent }) =>
	MainModule.setComponents(components);

export default setComponents;
