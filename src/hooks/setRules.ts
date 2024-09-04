import MainModule from "~/main";
import { TSynergyRule } from "~/types";

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
