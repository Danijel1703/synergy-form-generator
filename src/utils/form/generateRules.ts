import { each, map } from "lodash";
import { TCustomRules, TFormField } from "~/types";
import { Rule } from "~/classes";
import MainModule from "~/main";

type TDynamicRule = {
	isActive: boolean | Function;
	value: string | number | RegExp | Array<any>;
};

function generateRules(
	rules: TSynergyRules,
	customRules: TCustomRules | undefined,
	field: TFormField
) {
	const temp: any = [];
	each(rules, (value, key) => {
		if (typeof value === "object") {
			const dynamicRule = value as TDynamicRule;
			temp.push({
				name: key,
				isActive: dynamicRule.isActive,
				validator: MainModule.validators[key] as (values: any) => {
					isValid: boolean;
					error: string | undefined;
				},
				compareValue: dynamicRule.value,
				dependencies: field.dependencies,
			});
		} else {
			temp.push({
				name: key,
				isActive: value,
				validator: MainModule.validators[key] as (values: any) => {
					isValid: boolean;
					error: string | undefined;
				},
				compareValue: value,
				dependencies: field.dependencies,
			});
		}
	});
	if (customRules) {
		each(customRules, (rule) => {
			temp.push({
				name: rule.name,
				isActive: rule.isActive,
				validator: rule.validator,
				dependencies: field.dependencies,
			});
		});
	}
	return map(temp, (t) => new Rule(t, field));
}

export default generateRules;
