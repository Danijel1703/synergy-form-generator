import { each, map } from 'lodash';
import { TCustomRules, TFormField, TRule } from '~/types';
import { Rule } from '~/classes';
import { validators } from './validators';

function generateRules(
	rules: TSynergyRules,
	customRules: TCustomRules | undefined,
	field: TFormField
) {
	const temp: any = [];
	each(rules, (value, key) => {
		temp.push({
			name: key,
			isActive: value,
			validator: validators[key] as (values: any) => {
				isValid: boolean;
				error: string | undefined;
			},
		});
	});
	if (customRules) {
		each(customRules, (rule) => {
			temp.push({
				name: rule.name,
				isActive: rule.isActive,
				validator: rule.validator,
			});
		});
	}
	return map(temp, (t) => new Rule(t, field) as TRule);
}

export default generateRules;
