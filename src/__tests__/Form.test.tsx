import { fireEvent, render } from "@testing-library/react";
import { each } from "lodash";
import { Form } from "synergy-form-generator/classes";
import {
	ColorInput,
	DateInput,
	EmailInput,
	FileInput,
	MonthInput,
	NumberInput,
	PasswordInput,
	PhoneInput,
	TextInput,
	TimeInput,
	UrlInput,
	WeekInput,
} from "synergy-form-generator/components";
import {
	errorConstants,
	fieldTypeConstants,
	ruleConstants,
} from "synergy-form-generator/constants";
import { createField } from "synergy-form-generator/hooks";
import { TFieldProps, TForm, TFormField } from "synergy-form-generator/types";

const mockFieldNames = {
	firstName: "firstName",
	lastName: "lastName",
	email: "email",
	phoneNumber: "phoneNumber",
	password: "password",
	dateOfBirth: "dateOfBirth",
};

const fieldPropsConstants: Array<TFieldProps> = [
	{
		name: mockFieldNames.firstName,
		label: "First Name",
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
	{
		name: mockFieldNames.lastName,
		label: "Last Name",
		type: fieldTypeConstants.text,
		rules: {
			required: true,
		},
	},
	{
		name: mockFieldNames.password,
		label: "Password",
		type: fieldTypeConstants.password,
		rules: {
			mustContainDigit: true,
			mustContainLower: true,
			mustContainUpper: true,
			mustContainSpecial: true,
			required: true,
		},
	},
	{
		name: mockFieldNames.email,
		label: "Email",
		type: fieldTypeConstants.email,
		rules: {
			required: true,
			email: true,
		},
	},
	{
		name: mockFieldNames.phoneNumber,
		label: "Phone Number",
		type: fieldTypeConstants.phone,
		rules: {
			numeric: true,
			required: true,
		},
	},
	{
		name: mockFieldNames.dateOfBirth,
		label: "Date of Birth",
		type: fieldTypeConstants.date,
		rules: {
			required: true,
		},
	},
];

const triggerFieldsChange = (
	fields: { [key: string]: TFormField },
	defaultValues: { [key: string]: any }
) => {
	each(fields, (field) => {
		switch (field.type) {
			case fieldTypeConstants.text: {
				const renderInput = render(<TextInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.password: {
				const renderInput = render(<PasswordInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.color: {
				const renderInput = render(<ColorInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.email: {
				const renderInput = render(<EmailInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.file: {
				const renderInput = render(<FileInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				const file = new File(["test"], "test.png", { type: "image/png" });
				fireEvent.change(input, { target: { files: [file] } });
				break;
			}
			case fieldTypeConstants.month: {
				const renderInput = render(<MonthInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.phone: {
				const renderInput = render(<PhoneInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.time: {
				const renderInput = render(<TimeInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.url: {
				const renderInput = render(<UrlInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.week: {
				const renderInput = render(<WeekInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.date: {
				const renderInput = render(<DateInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
			case fieldTypeConstants.number: {
				const renderInput = render(<NumberInput {...field} />);
				const input = renderInput.getByLabelText(field.label);
				fireEvent.change(input, {
					target: {
						value: defaultValues[field.name],
					},
				});
				break;
			}
		}
	});
};

describe("Form", () => {
	let fieldProps: Array<TFieldProps>;
	let onSubmit: jest.Mock;
	let EntityClass: jest.Mock;
	let entity: any;
	let updatedEntity: any;
	let defaultInvalidEntity: any;
	let emailError: {
		field: string;
		errors: [{ rule: string; error: string }];
	};
	let form: TForm;

	beforeEach(() => {
		fieldProps = fieldPropsConstants;
		onSubmit = jest.fn();
		EntityClass = jest.fn().mockImplementation(() => ({
			firstName: undefined,
			lastName: undefined,
			password: undefined,
			email: undefined,
			phoneNumber: undefined,
			dateOfBirth: undefined,
		}));
		entity = {
			firstName: "Danijel",
			email: "synergy.form.generator@gmail.com",
			lastName: "Jakovac",
			phoneNumber: 123456,
			dateOfBirth: "2023-09-07",
			password: "Danijel123?",
		};
		updatedEntity = {
			firstName: "Max",
			email: "synergy.form.generator2pdated@gmail.com",
			lastName: "Twix",
			phoneNumber: 1234567,
			dateOfBirth: "2023-10-07",
			password: "Danijel123456?",
		};
		defaultInvalidEntity = {
			firstName: undefined,
			lastName: undefined,
			email: "synergy.form.generator",
			phoneNumber: "123456",
			dateOfBirth: "",
			password: "Danijel",
		};
		emailError = {
			field: mockFieldNames.email,
			errors: [
				{
					rule: ruleConstants.email,
					error: errorConstants.email.replace(":field:", "Email"),
				},
			],
		};
		form = new Form(fieldProps, onSubmit, {}, entity);
	});

	it("should initialize entity using EntityClass if provided", () => {
		const form = new Form(fieldProps, onSubmit, {}, undefined, EntityClass);
		expect(EntityClass).toHaveBeenCalled();
		expect(form.entity).toEqual({
			firstName: undefined,
			email: undefined,
			lastName: undefined,
			phoneNumber: undefined,
			dateOfBirth: undefined,
			password: undefined,
		});
	});

	it("should return form values", () => {
		const values = form.values;
		expect(values).toEqual(entity);
	});

	it("should return if the form has changed", () => {
		const renderedInput = render(<TextInput {...form.fields["firstName"]} />);
		const input = renderedInput.getByLabelText(form.fields["firstName"].label);
		fireEvent.change(input, { target: { value: "Danijel25" } });
		expect(form.hasChanged()).toBeTruthy();
	});

	it("should return if the form is valid", () => {
		triggerFieldsChange(form.fields, entity);
		expect(form.isValid).toBeTruthy();
	});

	it("should return form errors", () => {
		triggerFieldsChange(form.fields, defaultInvalidEntity);
		expect(form.errors).toContainEqual(emailError);
	});

	it("should clear form errors", () => {
		triggerFieldsChange(form.fields, defaultInvalidEntity);
		expect(form.errors).toContainEqual(emailError);
		form.clearErrors();
		expect(form.errors).not.toContainEqual(emailError);
	});

	it("should clear form values", () => {
		const form = new Form(fieldProps, onSubmit, {}, entity);
		each(form.fields, (field) => {
			expect(field.value).toBe(entity[field.name]);
		});
		form.clear();
		each(form.fields, (field) => {
			expect(field.value).not.toBeDefined();
		});
	});

	it("should reset form values", () => {
		const form = new Form(fieldProps, onSubmit, {}, updatedEntity);
		triggerFieldsChange(form.fields, entity);
		each(form.fields, (field) => {
			expect(field.value).toBe(entity[field.name]);
		});
		form.reset();
		each(form.fields, (field) => {
			expect(field.value).toBe(updatedEntity[field.name]);
		});
		each(form.fields, (field) => {
			expect(form.entity[field.name]).toBe(updatedEntity[field.name]);
		});
	});

	it("check field enableing and disableing", () => {
		form.disable();
		each(form.fields, (field) => expect(field.disabled).toBeTruthy());

		form.enable();
		each(form.fields, (field) => expect(field.disabled).toBeFalsy());
	});

	it("should add new field", () => {
		const countryField = {
			name: "country",
			label: "Country",
			type: fieldTypeConstants.text,
			rules: {
				required: true,
			},
		};
		createField(countryField, form, true);
		expect(form.fields).toHaveProperty(countryField.name);
	});
});
