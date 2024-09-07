import { cleanup, fireEvent, render } from "@testing-library/react";
import { each, first, isEmpty } from "lodash";
import { Form } from "synergy-form-generator/classes";
import { TextInput } from "synergy-form-generator/components";
import {
	fieldTypeConstants,
	ruleConstants,
} from "synergy-form-generator/constants";
import { TFieldProps, TForm, TFormField } from "synergy-form-generator/types";
import { required } from "synergy-form-generator/utils/validators";

describe("Rule", () => {
	let fieldProps: TFieldProps;
	let anotherFieldProps: TFieldProps;
	let entity: any;
	let form: TForm;
	let field: TFormField;

	beforeEach(() => {
		fieldProps = {
			name: "firstName",
			label: "First Name",
			type: fieldTypeConstants.text,
			rules: {
				required: true,
			},
		};
		anotherFieldProps = {
			name: "lastName",
			label: "Last Name",
			type: fieldTypeConstants.text,
			rules: {
				min: {
					isActive: ({ firstName }) => !isEmpty(firstName),
					value: 10,
				},
				required: ({ firstName }) => !isEmpty(firstName),
			},
			dependencies: ["firstName"],
		};
		entity = {
			firstName: undefined,
			email: "synergy.form.generator@gmail.com",
			lastName: "Jakovac",
			phoneNumber: 123456,
			dateOfBirth: "2023-09-07",
			password: "Danijel123?",
		};

		form = new Form([fieldProps, anotherFieldProps], jest.fn(), {}, entity);
		field = form.fields["firstName"];
	});

	const fireOnChange = (value: string) => {
		const renderInput = render(<TextInput {...field} />);
		const input = renderInput.getByLabelText(field.label);
		fireEvent.change(input, {
			target: {
				value: value,
			},
		});
		cleanup();
	};

	it("check if rule initializes properly", () => {
		const rule = first(field.rules);
		expect(rule.dependencies).toEqual([]);
		expect(rule.name).toBe(ruleConstants.required);
		expect(rule.error).not.toBeDefined();
		expect(rule.isValid).toBeFalsy();
		expect(rule.validator).toBe(required);
	});

	it("test dynamic rule activation", () => {
		const field = form.fields["lastName"];
		each(field.rules, (rule) => expect(rule.isActive).toBeFalsy());
		fireOnChange("Test");
		each(field.rules, (rule) => expect(rule.isActive).toBeTruthy());
	});
});
