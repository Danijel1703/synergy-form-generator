import "styles/User.Module.css";
import { useForm } from "~/hooks";
import { UserCreateModel } from "~/models";
import { FormGenerator, Submit } from "~/components";
import Field from "~/components/Field";
import { UserCreateFields } from "~/form-fields";

const UserCreatePage = () => {
	const form = useForm<UserCreateModel>({
		onSubmit: () => {},
		fieldProps: UserCreateFields,
		EntityClass: UserCreateModel,
	});
	const { fields } = form;
	const { username } = fields;

	return (
		<div>
			<div className="form-wrapper">
				<Field
					field={username}
					component={() => (
						<>
							<div>{username.error}</div>
							<input type="text" onChange={username.onChange} />
						</>
					)}
				/>

				<Submit
					form={form}
					component={() => (
						<button
							type="submit"
							disabled={!form.isValid}
							onSubmit={form.onSubmit}
						>
							neki shit
						</button>
					)}
				/>
			</div>
			<FormGenerator fields={form.fields} onSubmit={form.onSubmit} />
		</div>
	);
};

export default UserCreatePage;
