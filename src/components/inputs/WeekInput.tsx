import { TFieldComponentProps } from "~/types";
import BaseInput from "./BaseInput";
import { observer } from "mobx-react";

function WeekInput(props: TFieldComponentProps) {
	return <BaseInput {...props} />;
}

export default observer(WeekInput);
