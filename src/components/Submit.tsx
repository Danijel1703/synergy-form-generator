import { observer } from "mobx-react";
import { useEffect } from "react";
import { TForm } from "~/types";

type Props = {
	component: JSX.Element | JSX.Element[] | (() => JSX.Element);
	form: TForm;
};

const Submit = observer(({ form, component }: Props) => {
	useEffect(() => {}, [form.isValid]);
	const Component = component;
	return <Component />;
});

export default Submit;
