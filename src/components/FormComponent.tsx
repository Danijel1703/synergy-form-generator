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
			onSubmit={async (e) => {
				e.preventDefault();
				await form.onSubmit(form.values);
			}}
			className={className}
		>
			{children}
		</form>
	);
}

export default FormComponent;
