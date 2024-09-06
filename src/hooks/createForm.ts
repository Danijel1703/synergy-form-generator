import { Form } from "synergy-form-generator/classes";
import { TFieldProps, TOptions } from "synergy-form-generator/types";

function createForm<TEntity>({
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
	EntityClass?: new () => TEntity;
}) {
	const form = new Form(fieldProps, onSubmit, options, entity, EntityClass);
	return form;
}

export default createForm;
