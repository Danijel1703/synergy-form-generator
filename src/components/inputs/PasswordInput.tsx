import { observer } from 'mobx-react';
import React from 'react';
import { TFieldComponentProps } from '~/types';

function PasswordInput(props: TFieldComponentProps) {
	const { onChange, placeholder, label, className, value, error, rules } =
		props;
	return (
		<React.Fragment>
			<span>{label}</span>
			<span>{error}</span>
			{rules.required ? 'Required' : ''}
			<input
				value={value}
				className={className}
				type="password"
				onChange={onChange}
				placeholder={placeholder}
			/>
		</React.Fragment>
	);
}

export default observer(PasswordInput);
