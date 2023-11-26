import { isEmpty } from 'lodash';
import { fieldTypeConstants } from '~/constants';
import { TFieldProps } from '~/types';

const UserCreateFields: Array<TFieldProps> = [
	{
		name: 'username',
		label: 'Username',
		type: fieldTypeConstants.text,
		rules: {
			required: true,
			mustContainUpper: true,
		},
		placeholder: 'kukac',
	},
	{
		name: 'password',
		label: 'Password',
		type: fieldTypeConstants.password,
		rules: {
			required: (values: any) => {
				return !isEmpty(values.username);
			},
		},
	},
	{
		name: 'confirmedPassword',
		label: 'Confirmed Password',
		type: fieldTypeConstants.password,
		rules: {
			required: true,
		},
	},
	{
		name: 'email',
		label: 'Email',
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
	{
		name: 'confirmedEmail',
		label: 'Confirmed Email',
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
	{
		name: 'firstName',
		label: 'First Name',
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
	{
		name: 'lastName',
		label: 'Last Name',
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
];

export default UserCreateFields;
