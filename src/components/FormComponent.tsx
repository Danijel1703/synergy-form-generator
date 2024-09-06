import { ReactNode } from "react";
import { TForm } from "synergy-form-generator/types";

function FormComponent({
	form,
	children,
}: {
	form: TForm;
	children: ReactNode;
}) {
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

export default FormComponent;
