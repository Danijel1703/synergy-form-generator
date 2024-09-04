import { ReactNode } from "react";
import { TForm } from "~/types";

function Form({ form, children }: { form: TForm; children: ReactNode }) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.onSubmit(form.values);
			}}
		>
			{children}
		</form>
	);
}

export default Form;
