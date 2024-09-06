import { map } from "lodash";
import { observer } from "mobx-react";
import { fieldTypeConstants } from "synergy-form-generator/constants";
import { TFieldComponentProps } from "synergy-form-generator/types";

function CheckboxInput(props: TFieldComponentProps) {
	const { items, placeholder, onChange, className, disabled } = props;
	return map(items, (item) => {
		return (
			<div key={item.id}>
				<input
					id={item.id}
					className={className}
					type={fieldTypeConstants.checkbox}
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

export default observer(CheckboxInput);
