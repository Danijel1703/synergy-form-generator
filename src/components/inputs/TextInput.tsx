import { observer } from "mobx-react";
import React from "react";
import { TFieldComponentProps } from "~/types";

function TextInput(props: TFieldComponentProps) {
	const {
		error,
		placeholder,
		label,
		value,
		onChange,
		className,
		rules,
		disabled,
	} = props;

	return (
		<React.Fragment>
			<span>{label}</span>
			<span>{error}</span>
			{rules.required ? "Required" : ""}
			<input
				className={className}
				type="text"
				onChange={onChange}
				placeholder={placeholder}
				value={value}
				disabled={disabled}
			/>
		</React.Fragment>
	);
}

export default observer(TextInput);
