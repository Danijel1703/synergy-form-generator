import MainModule from "synergy-form-generator/MainModule";
import { TSynergyRule } from "synergy-form-generator/types";

const replaceRule = ({
	name,
	validator,
}: {
	name: TSynergyRule;
	validator: (values: any) => { isValid: boolean; error: string | undefined };
}) => MainModule.replaceRule({ name, validator });

export default replaceRule;
