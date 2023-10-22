import { Form } from '~/components';
import { UserCreateStore } from '~/stores';
import { observer } from 'mobx-react';
import 'styles/User.Module.css';

type Props = {
	store: UserCreateStore;
};

const UserCreatePage = ({ store }: Props) => {
	const { form, values, isValid } = store;
	return (
		<div>
			<div className="form-wrapper">
				<Form
					formFields={form.fields}
					onSubmit={() => {
						console.log(values());
					}}
					isValid={isValid}
				/>
			</div>
		</div>
	);
};

export default observer(UserCreatePage);
