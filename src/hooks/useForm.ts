import { Form } from "~/classes";
import { TFieldProps, TOptions } from "~/types";

function useForm<TEntity>({
  EntityClass,
  fieldProps,
  onSubmit,
  options,
  entity,
}: {
  EntityClass: new () => TEntity; //Make an optional param
  fieldProps: Array<TFieldProps>;
  onSubmit: Function;
  options?: TOptions;
  entity?: TEntity;
}) {
  const form = new Form(EntityClass, fieldProps, onSubmit, options, entity);
  return form;
}

export default useForm;
