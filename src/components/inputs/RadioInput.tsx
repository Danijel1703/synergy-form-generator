import { map } from "lodash";
import { observer } from "mobx-react";
import { fieldTypeConstants } from "synergy-form-generator/constants";
import { TFieldComponentProps } from "synergy-form-generator/types";
import { v4 as uuidv4 } from "uuid";

function RadioInput(props: TFieldComponentProps) {
	const { items, placeholder, onChange, className, disabled } = props;
	const radioGroupName = uuidv4();
	return map(items, (item) => {
		return (
			<div key={item.id}>
				<input
					id={item.id}
					name={radioGroupName}
					className={className}
					type={fieldTypeConstants.radio}
					onChange={onChange}
					placeholder={placeholder}
					value={item.value}
					disabled={disabled}
				/>
				<label htmlFor={item.id}>{item.label}</label>
				<br />
			</div>
		);
	});
}

export default observer(RadioInput);
