import { observer } from "mobx-react";
import { useEffect } from "react";
import {
	TFormField,
	TSynergyFieldComponent,
} from "synergy-form-generator/types";

type Props = {
	component?: TSynergyFieldComponent;
	field: TFormField;
};

const FieldComponent = observer(({ component, field }: Props) => {
	const dependencies = [field.error, field.isValid, field.value, field.items];
	useEffect(() => {}, dependencies);
	const Component = component || field.component;
	return (
		<Component
			rules={field.rules}
			isValid={field.isValid}
			value={field.value}
			error={field.error}
			label={field.label}
			placeholder={field.placeholder}
			onChange={field.onChange}
			isRequired={field.isRequired}
			disabled={field.disabled}
			type={field.type}
			addOption={field.addOption}
			removeOption={field.removeOption}
			items={field.items}
			setValue={field.setValue}
		/>
	);
});

export default FieldComponent;
