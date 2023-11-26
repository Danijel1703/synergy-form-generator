import { Form } from '~/components';
import { observer } from 'mobx-react';
import 'styles/User.Module.css';
import { useForm } from '~/hooks';
import { UserCreateModel } from '~/models';
import { UserCreateFields } from '~/form-fields';

const UserCreatePage = () => {
	const { form, onSubmit, isValid } = useForm<UserCreateModel>({
		EntityClass: UserCreateModel,
		onSubmit: () => {},
		fieldProps: UserCreateFields,
	});
	return (
		<div>
			<div className="form-wrapper">
				<Form form={form} onSubmit={() => onSubmit()} isValid={isValid} />
			</div>
		</div>
	);
};

export default observer(UserCreatePage);
