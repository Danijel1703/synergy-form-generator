import { map } from "lodash";
import { observer } from "mobx-react";
import { fieldTypeConstants } from "synergy-form-generator/constants";
import {
	TFieldComponentProps,
	TForm,
	TFormField,
} from "synergy-form-generator/types";
import FormComponent from "./FormComponent";

type Props = {
	className?: string;
	form: TForm;
};

function FormGenerator(props: Props) {
	const { form } = props;
	const { fields, isValid, onSubmit } = form;

	return (
		<FormComponent {...props}>
			{map(fields, (formField) => (
				<RenderComponent
					key={formField.id}
					formField={formField as TFieldComponentProps & TFormField}
				/>
			))}
			<Submit onSubmit={onSubmit} isValid={isValid} form={form} />
		</FormComponent>
	);
}

const Submit = observer(
	({ isValid }: { isValid: boolean; onSubmit: Function; form: TForm }) => {
		return <input type={fieldTypeConstants.submit} disabled={!isValid} />;
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
			isRequired,
			fieldClassName,
			labelClassName,
			errorClassName,
			inputClassName,
			hideField,
			addOption,
			removeOption,
			setValue,
		} = formField;
		const Component = formField.component;

		if (hideField) return <></>;
		return (
			<Component
				inputClassName={inputClassName}
				fieldClassName={fieldClassName}
				labelClassName={labelClassName}
				errorClassName={errorClassName}
				isRequired={isRequired}
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
				addOption={addOption}
				removeOption={removeOption}
				setValue={setValue}
			/>
		);
	}
);

export default observer(FormGenerator);
