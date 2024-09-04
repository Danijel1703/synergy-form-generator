import MainModule from "~/main";
import { TSynergyRule } from "~/types";

const replaceRule = ({
	name,
	validator,
}: {
	name: TSynergyRule;
	validator: (values: any) => { isValid: boolean; error: string | undefined };
}) => MainModule.replaceRule({ name, validator });

export default replaceRule;
