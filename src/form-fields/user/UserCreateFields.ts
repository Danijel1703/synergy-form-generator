import { includes, isEmpty } from "lodash";
import { fieldTypeConstants } from "~/constants";
import { TFieldProps } from "~/types";

const UserCreateFields: Array<TFieldProps> = [
	{
		name: "username",
		label: "Username",
		type: fieldTypeConstants.text,
		rules: {
			required: true,
			mustContainUpper: true,
		},
	},
	{
		name: "password",
		label: "Password",
		type: fieldTypeConstants.password,
		rules: {
			required: (values: any) => {
				return !isEmpty(values.firstName) && !isEmpty(values.username);
			},
		},
		dependencies: ["firstName", "username"],
	},
	{
		name: "confirmedPassword",
		label: "Confirmed Password",
		type: fieldTypeConstants.password,
		rules: {
			required: true,
		},
	},
	{
		name: "email",
		label: "Email",
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
		customRules: [
			{
				name: "someCustomRule",
				isActive: (values: any) => {
					return !isEmpty(values.username) && !isEmpty(values.password);
				},
				validator: (value: any) => {
					if (!includes(value, "b")) {
						return { isValid: false, error: "OVO JE NEKI ERROR" };
					} else {
						return { isValid: true, error: undefined };
					}
				},
			},
		],
	},
	{
		name: "confirmedEmail",
		label: "Confirmed Email",
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
	{
		name: "firstName",
		label: "First Name",
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
	{
		name: "role",
		label: "Role",
		type: fieldTypeConstants.dropdown,
		getItems: () => [
			{ id: 1, value: "first", label: "First" },
			{ id: 2, value: "second", label: "Second" },
			{ id: 3, value: "third", label: "Third" },
		],
		rules: {
			required: true,
		},
	},
];

export default UserCreateFields;
