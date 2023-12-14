import { Form } from "~/classes";
import { TFieldProps, TOptions } from "~/types";

function useForm<TEntity>({
	EntityClass,
	fieldProps,
	onSubmit,
	options,
	entity,
}: {
	fieldProps: Array<TFieldProps>;
	onSubmit: Function;
	options?: TOptions;
	entity?: TEntity;
	EntityClass?: new () => TEntity; //Make an optional param
}) {
	const form = new Form(fieldProps, onSubmit, options, entity, EntityClass);
	return form;
}

export default useForm;
