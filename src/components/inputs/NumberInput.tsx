import { TFieldComponentProps } from "~/types";
import BaseInput from "./BaseInput";
import { observer } from "mobx-react";

function NumberInput(props: TFieldComponentProps) {
	return <BaseInput {...props} />;
}

export default observer(NumberInput);
