import { observer } from "mobx-react";
import { TFieldComponentProps } from "synergy-form-generator/types";
import BaseInput from "./BaseInput";

function PasswordInput(props: TFieldComponentProps) {
	return <BaseInput {...props} />;
}

export default observer(PasswordInput);
