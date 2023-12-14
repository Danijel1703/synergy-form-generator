import "styles/User.Module.css";
import { useForm } from "~/hooks";
import { UserCreateModel } from "~/models";
import { Submit } from "~/components";
import { fieldTypeConstants } from "~/constants";
import Field from "~/components/Field";

const UserCreatePage = () => {
	const form = useForm<UserCreateModel>({
		onSubmit: () => {},
		fieldProps: [
			{
				name: "username",
				label: "Username",
				type: fieldTypeConstants.text,
				rules: {
					required: true,
				},
			},
		],
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
		</div>
	);
};

export default UserCreatePage;
