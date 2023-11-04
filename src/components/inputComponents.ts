import { PasswordInput, TextInput } from '.';
import { FunctionComponent } from 'react';

const inputComponents: { [key: string]: FunctionComponent } = {
	text: TextInput as FunctionComponent,
	password: PasswordInput as FunctionComponent,
};

export default inputComponents;
