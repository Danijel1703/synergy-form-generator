import { cleanup, fireEvent, render } from "@testing-library/react";
import { isEmpty } from "lodash";
import { Form, FormField } from "synergy-form-generator/classes";
import { TextInput } from "synergy-form-generator/components";
import { fieldTypeConstants } from "synergy-form-generator/constants";
import { TFieldProps, TForm, TFormField } from "synergy-form-generator/types";

describe("FormField", () => {
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
			hideField: ({ firstName }) => isEmpty(firstName),
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

	it("should initialize rules if any", () => {
		const setRules = jest.spyOn(FormField.prototype, "setRules");
		new FormField(fieldProps, entity, form);
		expect(setRules).toHaveBeenCalled();
	});

	it("should trigger onChange", () => {
		const onChange = jest.spyOn(field, "onChange");
		fireOnChange("Test");
		expect(onChange).toHaveBeenCalled();
	});

	it("should return is valid", () => {
		fireOnChange("Test");
		expect(field.isValid).toBeTruthy();
		fireOnChange("");
		expect(field.isValid).toBeFalsy();
	});

	it("should hide field", () => {
		fireOnChange("");
		expect(field.isValid).toBeFalsy();
		expect(form.fields["lastName"].hideField).toBeTruthy();
	});

	it("check if field has changed", () => {
		fireOnChange("Some test");
		expect(field.hasChanged()).toBeTruthy();
	});

	it("check field reset and clear", () => {
		field.clear();
		expect(field.value).not.toBeDefined();
		field.reset();
		expect(field.value).toBe(entity.firstName);
	});

	it("check field enable and disable", () => {
		field.disable();
		expect(field.disabled).toBeTruthy();
		field.enable();
		expect(field.disabled).toBeFalsy();
	});

	it("check onChangeCallback trigger", () => {
		const onChangeCallback = jest.fn();
		field.addOnChangeCallback(onChangeCallback);
		fireOnChange("Test onChangeCallback");
		expect(onChangeCallback).toHaveBeenCalled();
	});
});
