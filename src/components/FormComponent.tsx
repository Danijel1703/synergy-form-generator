import { ReactNode } from "react";
import { TForm } from "synergy-form-generator/types";

function FormComponent({
	form,
	children,
	className,
}: {
	form: TForm;
	children: ReactNode;
	className?: string;
}) {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				form.onSubmit(form.values);
			}}
			className={className}
		>
			{children}
		</form>
	);
}

export default FormComponent;
