import { map } from "lodash";
import { observer } from "mobx-react";
import { TFieldComponentProps, TFormField } from "~/types";

type Props = {
	fields: { [key: string]: TFormField };
	onSubmit: () => void;
	className?: string;
	isValid: boolean;
};

function FormGenerator(props: Props) {
	const { fields, onSubmit, className, isValid } = props;

	return (
		<form className={`col ${className}`}>
			{map(fields, (formField) => (
				<RenderComponent
					key={formField.id}
					formField={formField as TFieldComponentProps & TFormField}
				/>
			))}
			<Submit onSubmit={onSubmit} isValid={isValid} />
		</form>
	);
}

const Submit = observer(
	({ isValid, onSubmit }: { isValid: boolean; onSubmit: () => void }) => {
		return <input type="button" disabled={!isValid} onClick={onSubmit} />;
	}
);

const RenderComponent = observer(
	({ formField }: { formField: TFieldComponentProps & TFormField }) => {
		const {
			placeholder,
			label,
			value,
			onChange,
			className,
			rules,
			disabled,
			error,
			dropdownStore,
		} = formField;
		const Component = formField.component;
		return (
			<Component
				key={formField.name}
				placeholder={placeholder}
				label={label}
				value={value}
				onChange={onChange}
				className={className}
				rules={rules}
				disabled={disabled}
				error={error}
				dropdownStore={dropdownStore}
			/>
		);
	}
);

export default observer(FormGenerator);
