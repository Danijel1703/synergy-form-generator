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
	const dependencies = [field.error, field.isValid, field.value];
	useEffect(() => {}, dependencies);
	const Component = component || field.component;
	return <Component {...field} />;
});

export default FieldComponent;
