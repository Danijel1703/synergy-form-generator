import { map } from 'lodash';
import { observer } from 'mobx-react';
import { TFormField } from '~/types';

type Props = {
	formFields: { [key: string]: TFormField };
	onSubmit: () => void;
	className?: string;
	isValid: boolean;
};

function Form(props: Props) {
	const { formFields, onSubmit, className, isValid } = props;
	return (
		<form className={`col ${className}`}>
			{map(formFields, (formField) => (
				<RenderComponent key={formField.id} formField={formField} />
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

const RenderComponent = observer(({ formField }: { formField: TFormField }) => {
	const Component = formField.component;
	return <Component key={formField.name} {...formField} />;
});

export default observer(Form);
