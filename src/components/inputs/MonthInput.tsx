import { TFieldComponentProps } from "synergy-form-generator/types";
import BaseInput from "./BaseInput";
import { observer } from "mobx-react";

function MonthInput(props: TFieldComponentProps) {
	return <BaseInput {...props} />;
}

export default observer(MonthInput);
