import MainModule from "synergy-form-generator/MainModule";
import { TSynergyRule } from "synergy-form-generator/types";

const setRules = (
	rules: Array<{
		name: TSynergyRule;
		validator: (values: any) => {
			isValid: boolean;
			error: string | undefined;
		};
	}>
) => MainModule.setRules(rules);

export default setRules;
