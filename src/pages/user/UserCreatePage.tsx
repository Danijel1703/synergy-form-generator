import { Form } from "~/components";
import { observer } from "mobx-react";
import "styles/User.Module.css";
import { useForm } from "~/hooks";
import { UserCreateModel } from "~/models";
import { UserCreateFields } from "~/form-fields";

const UserCreatePage = () => {
	const { fields, onSubmit, isValid } = useForm<UserCreateModel>({
		EntityClass: UserCreateModel,
		onSubmit: () => {},
		fieldProps: UserCreateFields,
	});

	return (
		<div>
			<div className="form-wrapper">
				<Form fields={fields} onSubmit={() => onSubmit()} isValid={isValid} />
			</div>
		</div>
	);
};

export default observer(UserCreatePage);
