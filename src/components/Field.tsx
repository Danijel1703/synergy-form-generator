import { observer } from "mobx-react";
import { useEffect } from "react";
import { TFormField } from "~/types";

type Props = {
	component: JSX.Element | JSX.Element[] | (() => JSX.Element);
	field: TFormField;
};

const Field = observer(({ component, field }: Props) => {
	const dependencies = [field.error, field.isValid, field.value];
	useEffect(() => {}, dependencies);
	const Component = component;
	return <Component />;
});

export default Field;
