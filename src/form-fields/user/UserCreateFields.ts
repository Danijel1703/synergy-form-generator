import { isEmpty } from "lodash";
import { fieldTypeConstants } from "~/constants";
import { TFieldProps, TSelectableItem } from "~/types";

const UserCreateFields: Array<TFieldProps> = [
	{
		name: "username",
		label: "Username",
		type: fieldTypeConstants.text,
		rules: {
			required: true,
			mustContainUpper: true,
			mustContainLower: true,
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
		getItems: () =>
			new Promise<Array<TSelectableItem>>((resolve, reject) =>
				setTimeout(() => {
					resolve([
						{ id: 1, value: "first", label: "First" },
						{ id: 2, value: "second", label: "Second" },
						{ id: 3, value: "third", label: "Third" },
					]);
				}, 2000)
			),
		rules: {
			required: true,
		},
	},
	{
		name: "penis2",
		label: "penis2",
		type: fieldTypeConstants.number,
		rules: {
			min: 5,
			max: {
				isActive: true,
				value: 8,
			},
		},
	},
];

export default UserCreateFields;
