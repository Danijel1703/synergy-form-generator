import { isNil } from "lodash";
import { observer } from "mobx-react";
import React from "react";
import { TFieldComponentProps } from "synergy-form-generator/types";

function BaseInput(props: TFieldComponentProps) {
	const {
		error,
		placeholder,
		label,
		value,
		onChange,
		isRequired,
		disabled,
		type,
		fieldClassName,
		labelClassName,
		errorClassName,
		inputClassName,
	} = props;

	return (
		<React.Fragment>
			<div className={fieldClassName}>
				<label className={labelClassName}>
					{label}
					{isRequired && "*"}
				</label>
				{error && <span className={errorClassName}>{error}</span>}
				<input
					className={inputClassName}
					type={type}
					onChange={onChange}
					placeholder={placeholder}
					value={isNil(value) ? "" : value}
					disabled={disabled}
				/>
			</div>
		</React.Fragment>
	);
}

export default observer(BaseInput);
