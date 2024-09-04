import { TFieldComponentType, TSynergyFieldComponent } from "~/types";
import MainModule from "~/main";

const setComponents = (components: {
	[key: TFieldComponentType]: TSynergyFieldComponent;
}) => MainModule.setComponents(components);

export default setComponents;
