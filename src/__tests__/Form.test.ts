import { Form, FormField } from "synergy-form-generator/classes";

describe("Form", () => {
	let fieldPropsMock: Array<any>;
	let onSubmitMock: jest.Mock;
	let EntityClassMock: jest.Mock;
	let entityMock: any;

	beforeEach(() => {
		fieldPropsMock = [
			{ name: "field1", label: "Field 1", type: "text" },
			{ name: "field2", label: "Field 2", type: "number" },
		];
		onSubmitMock = jest.fn();
		EntityClassMock = jest.fn().mockImplementation(() => ({
			field1: "value1",
			field2: "value2",
		}));
		entityMock = {
			field1: "value1",
			field2: "value2",
		};
	});

	it("should initialize the form with fields and options", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);

		expect(form.fields).toHaveProperty("field1");
		expect(form.fields).toHaveProperty("field2");
		expect(form.options.clearInitialErrors).toBe(true);
	});

	it("should initialize entity using EntityClass if provided", () => {
		const form = new Form(
			fieldPropsMock,
			onSubmitMock,
			{},
			undefined,
			EntityClassMock
		);

		expect(EntityClassMock).toHaveBeenCalled();
		expect(form.entity).toEqual({ field1: "value1", field2: "value2" });
	});

	it("should validate form validity with isValid", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);

		// Mock validation for form fields
		form.fields["field1"].isValid = true;
		form.fields["field2"].isValid = true;

		expect(form.isValid).toBe(true);
	});

	it("should return form errors", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);

		// form.fields["field1"].errors = ["Error 1"];
		// form.fields["field2"].errors = ["Error 2"];

		const errors = form.errors;
		expect(errors).toEqual([
			{ field: "field1", errors: ["Error 1"] },
			{ field: "field2", errors: ["Error 2"] },
		]);
	});

	it("should return form values", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);

		form.fields["field1"].value = "Test Value 1";
		form.fields["field2"].value = "Test Value 2";

		const values = form.values;
		expect(values).toEqual({
			field1: "Test Value 1",
			field2: "Test Value 2",
		});
	});

	it("should detect if the form has changed", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);

		form.fields["field1"].hasChanged = jest.fn(() => true);
		form.fields["field2"].hasChanged = jest.fn(() => false);

		expect(form.hasChanged()).toBe(true);

		form.fields["field1"].hasChanged = jest.fn(() => false);
		form.fields["field2"].hasChanged = jest.fn(() => false);

		expect(form.hasChanged()).toBe(false);
	});

	it("should clear the form fields", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);
		const clearMock = jest.fn();
		form.fields["field1"].clear = clearMock;
		form.fields["field2"].clear = clearMock;

		form.clear();

		expect(clearMock).toHaveBeenCalledTimes(2);
	});

	it("should reset the form fields", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);
		const resetMock = jest.fn();
		form.fields["field1"].reset = resetMock;
		form.fields["field2"].reset = resetMock;

		form.reset();

		expect(resetMock).toHaveBeenCalledTimes(2);
	});

	it("should disable the form fields", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);
		const disableMock = jest.fn();
		form.fields["field1"].disable = disableMock;
		form.fields["field2"].disable = disableMock;

		form.disable();

		expect(disableMock).toHaveBeenCalledTimes(2);
	});

	it("should enable the form fields", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);
		const enableMock = jest.fn();
		form.fields["field1"].enable = enableMock;
		form.fields["field2"].enable = enableMock;

		form.enable();

		expect(enableMock).toHaveBeenCalledTimes(2);
	});

	it("should clear form errors", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);
		const clearErrorMock = jest.fn();

		// form.fields["field1"].rules = [{ clearError: clearErrorMock }];
		// form.fields["field2"].rules = [{ clearError: clearErrorMock }];

		form.clearErrors();

		expect(clearErrorMock).toHaveBeenCalledTimes(2);
	});

	it("should add a new field", () => {
		const form = new Form(fieldPropsMock, onSubmitMock, {}, entityMock);
		const newField = new FormField(
			{ name: "newField", label: "New Field", type: "text" },
			entityMock,
			form
		);
		form.addField(newField);

		expect(form.fields).toHaveProperty("newField");
		expect(form.fields["newField"].name).toBe("newField");
	});
});
