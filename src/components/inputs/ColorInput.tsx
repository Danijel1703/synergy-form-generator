import { TFieldComponentProps } from "~/types";
import BaseInput from "./BaseInput";
import { observer } from "mobx-react";

function ColorInput(props: TFieldComponentProps) {
	return <BaseInput {...props} />;
}

export default observer(ColorInput);
