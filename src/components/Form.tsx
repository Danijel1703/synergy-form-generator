import { map } from 'lodash';
import { observer } from 'mobx-react';
import { TFieldComponentProps, TForm, TFormField } from '~/types';

type Props = {
	form: TForm;
	onSubmit: () => void;
	className?: string;
	isValid: boolean;
};

function Form(props: Props) {
	const { form, onSubmit, className, isValid } = props;
	return (
		<form className={`col ${className}`}>
			{map(form.fields, (formField) => (
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
			/>
		);
	}
);

export default observer(Form);
