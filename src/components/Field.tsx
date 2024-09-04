import { observer } from "mobx-react";
import { FunctionComponent, useEffect } from "react";
import { TFormField } from "~/types";

type Props = {
	component: FunctionComponent;
	field: TFormField;
};

const Field = observer(({ component, field }: Props) => {
	const dependencies = [field.error, field.isValid, field.value];
	useEffect(() => {}, dependencies);
	const Component = component;
	return <Component />;
});

export default Field;
