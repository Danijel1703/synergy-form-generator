import { isNil } from "lodash";
import { observer } from "mobx-react";
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
				aria-label={label}
			/>
		</div>
	);
}

export default observer(BaseInput);
