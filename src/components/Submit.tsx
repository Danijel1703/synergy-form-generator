import { observer } from "mobx-react";
import { FunctionComponent, useEffect } from "react";
import { TForm } from "synergy-form-generator/types";

type Props = {
	component: JSX.Element | JSX.Element[] | (() => JSX.Element);
	form: TForm;
};

const Submit = observer(({ form, component }: Props) => {
	useEffect(() => {}, [form.isValid]);
	const Component = component as FunctionComponent;
	return <Component />;
});

export default Submit;
