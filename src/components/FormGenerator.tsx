import { map } from "lodash";
import { observer } from "mobx-react";
import { TFieldComponentProps, TForm, TFormField } from "~/types";

type Props = {
	fields: { [key: string]: TFormField };
	onSubmit: Function;
	className?: string;
	form: TForm;
};

function FormGenerator(props: Props) {
	const { onSubmit, className, form } = props;
	const { fields, isValid } = form;

	return (
		<form
			className={`col ${className}`}
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(form.values);
			}}
		>
			{map(fields, (formField) => (
				<RenderComponent
					key={formField.id}
					formField={formField as TFieldComponentProps & TFormField}
				/>
			))}
			<Submit onSubmit={onSubmit} isValid={isValid} form={form} />
		</form>
	);
}

const Submit = observer(
	({ isValid }: { isValid: boolean; onSubmit: Function; form: TForm }) => {
		return <input type="submit" disabled={!isValid} />;
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
			type,
			isValid,
			items,
		} = formField;
		const Component = formField.component;
		return (
			<Component
				items={items}
				isValid={isValid}
				key={formField.name}
				placeholder={placeholder}
				type={type}
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
