import { Form } from '~/classes';
import { TFieldProps, TOptions } from '~/types';

function useForm<TEntity>({
	EntityClass,
	formFields,
	onSubmit,
	options,
	entity,
}: {
	EntityClass: new () => TEntity; //Make an optional param
	formFields: Array<TFieldProps>;
	onSubmit: Function;
	options?: TOptions;
	entity?: TEntity;
}) {
	const form = new Form(EntityClass, formFields, onSubmit, options, entity);
	return form;
}

export default useForm;
