import { TFieldComponentProps } from "synergy-form-generator/types";
import { observer } from "mobx-react";

function FileInput(props: TFieldComponentProps) {
	const {
		placeholder,
		label,
		onChange,
		isRequired,
		disabled,
		type,
		fieldClassName,
		labelClassName,
		inputClassName,
	} = props;

	return (
		<>
			<div className={fieldClassName}>
				<label className={labelClassName}>
					{label}
					{isRequired && "*"}
				</label>
				<input
					className={inputClassName}
					type={type}
					onChange={onChange}
					placeholder={placeholder}
					disabled={disabled}
					aria-label={label}
				/>
			</div>
		</>
	);
}

export default observer(FileInput);
