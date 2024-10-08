import { observer } from "mobx-react";
import { TFieldComponentProps } from "synergy-form-generator/types";
import BaseInput from "./BaseInput";

function TextInput(props: TFieldComponentProps) {
	return <BaseInput {...props} />;
}

export default observer(TextInput);
