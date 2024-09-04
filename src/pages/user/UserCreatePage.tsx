import "styles/User.Module.css";
import { FormGenerator } from "~/components";
import { UserCreateFields } from "~/form-fields";
import { createForm } from "~/hooks";
import { UserCreateModel } from "~/models";

const UserCreatePage = () => {
	const form = createForm<UserCreateModel>({
		onSubmit: (values: any) => {
			console.log(values);
		},
		fieldProps: UserCreateFields,
	});

	return (
		<div>
			<FormGenerator
				fields={form.fields}
				onSubmit={form.onSubmit}
				form={form}
			/>
		</div>
	);
};

export default UserCreatePage;
