# Synergy Form Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/synergy-form-generator.svg)](https://badge.fury.io/js/synergy-form-generator)

**Synergy Form Generator** is a dynamic and highly customizable form-building library designed for React. It allows you to generate forms from a JSON schema with support for custom components, dynamic rules, and complex field dependencies.

## Key Features

- **JSON Schema-Based Forms**: Easily generate entire forms based on a provided JSON schema.
- **Customizable Components**: Use the `FormGenerator` for automatic form generation, or build your form manually by extracting fields and using the `FieldComponent`. You can also pass custom components as props.
- **Global Component Replacement**: Replace default input components like `TextInput` globally with `replaceComponent` or `setComponents`. This ensures that custom inputs are used consistently across the form and application.
- **Dynamic Field Dependencies**: Handle complex field interdependencies, such as dynamic rule activation, validation, and field value comparisons.
- **Dynamic Value Comparisons**: Compare values dynamically between fields. For example, the minimum value of one field can depend on the value of another.
- **Real-Time Field Updates**: Update fields in real-time based on changes in other fields using the `fieldsToUpdateOnChange` property.

## Installation

Install the package via npm:

```bash
npm install synergy-form-generator
```

Or via Yarn

```bash
yarn add synergy-form-generator
```

## Usage

### Example using `FormGenerator`

```typescript
import {
	FormGenerator,
	fieldTypeConstants,
	createForm,
} from "synergy-form-generator";

const schema = [
	{
		type: fieldTypeConstants.text,
		label: "Name",
		name: "name",
		rules: { required: true },
	},
	{
		type: fieldTypeConstants.number,
		label: "Price",
		name: "price",
		rules: {
			required: true,
			min: 10,
		},
	},
];

const handleSubmit = (formData: any) => {
	console.log("Form submitted with:", formData);
};

const form = createForm({ fieldProps: schema, onSubmit: handleSubmit });

function App() {
	return (
		<div>
			<h1>Create a Product</h1>
			<FormGenerator form={form} />
		</div>
	);
}

export default App;
```

### Example using `FieldComponent` and `FormComponent`

```typescript
import {
	fieldTypeConstants,
	createForm,
	FormComponent,
	FieldComponent,
	TFormField,
} from "synergy-form-generator";

const schema = [
	{
		type: fieldTypeConstants.text,
		label: "Name",
		name: "name",
		rules: { required: true },
	},
	{
		type: fieldTypeConstants.number,
		label: "Price",
		name: "price",
		rules: {
			required: true,
			min: 10,
		},
	},
];

const handleSubmit = (formData: any) => {
	console.log("Form submitted with:", formData);
};

const form = createForm({ fieldProps: schema, onSubmit: handleSubmit });

const { fields } = form;
const { name, price } = fields;

const BaseInput = ({ field }: { field: TFormField }) => {
	const { label, error, value, onChange, type, name } = field;
	return (
		<>
			<label>{label}</label>
			<span>{error}</span>
			<input name={name} value={value} onChange={onChange} type={type} />
		</>
	);
};

function App() {
	return (
		<div>
			<h1>Create a Product</h1>
			<FormComponent form={form}>
				<FieldComponent
					field={name}
					component={() => <BaseInput field={name} />}
				/>
				<FieldComponent
					field={price}
					component={() => <BaseInput field={price} />}
				/>
				<input type="submit" />
			</FormComponent>
		</div>
	);
}

export default App;
```

### Replacing default component using `ReplaceComponent`

```typescript
import {
	fieldTypeConstants,
	createForm,
	replaceComponent,
	TFieldComponentProps,
	FormGenerator,
} from "synergy-form-generator";

const schema = [
	{
		type: fieldTypeConstants.text,
		label: "Name",
		name: "name",
		rules: {
			required: true,
		},
	},
	{
		type: fieldTypeConstants.number,
		label: "Price",
		name: "price",
		rules: {
			required: true,
			min: 10,
		},
	},
];

const handleSubmit = (formData: any) => {
	console.log("Form submitted with:", formData);
};

const form = createForm({ fieldProps: schema, onSubmit: handleSubmit });

const BaseInput = (props: TFieldComponentProps) => {
	const { label, error, value, onChange, type } = props;
	return (
		<>
			I am now used as a default text Component!
			<label>{label}</label>
			<span>{error}</span>
			<input value={value} onChange={onChange} type={type} />
		</>
	);
};

replaceComponent(fieldTypeConstants.text, BaseInput);

function App() {
	return (
		<div>
			<h1>Create a Product</h1>
			<FormGenerator form={form} />
		</div>
	);
}

export default App;
```

### Dynamic validation example

```typescript
import {
	fieldTypeConstants,
	createForm,
	FormGenerator,
} from "synergy-form-generator";

const schema = [
	{
		type: fieldTypeConstants.text,
		label: "Min Price",
		name: "minPrice",
	},
	{
		type: fieldTypeConstants.number,
		label: "Price",
		name: "price",
		rules: {
			min: {
				isActive: ({ minPrice }) => minPrice > 0,
				value: ({ minPrice }) => minPrice,
			},
		},
		dependencies: ["minPrice"],
	},
	{
		type: fieldTypeConstants.text,
		label: "Max Price",
		name: "maxPrice",
		rules: {
			required: ({ minPrice }) => minPrice > 0,
		},
		dependencies: ["minPrice"],
	},
];

const handleSubmit = (formData: any) => {
	console.log("Form submitted with:", formData);
};

const form = createForm({ fieldProps: schema, onSubmit: handleSubmit });

function App() {
	return (
		<div>
			<h1>Create a Product</h1>
			<FormGenerator form={form} />
		</div>
	);
}

export default App;
```

### Custom validation and custom dynamic validation example

```typescript
import {
	fieldTypeConstants,
	createForm,
	FormGenerator,
} from "synergy-form-generator";

const schema = [
	{
		type: fieldTypeConstants.text,
		label: "Username",
		name: "username",
		customRules: [
			{
				name: "usernameCheck",
				validator: ({ value }) => {
					if (value.includes("123")) {
						return {
							isValid: false,
							error: "Username cannot contain value 123",
						};
					}
					return {
						isValid: true,
						error: undefined,
					};
				},
				isActive: true,
			},
		],
	},
	{
		type: fieldTypeConstants.password,
		label: "Password",
		name: "password",
		customRules: [
			{
				name: "passwordCheck",
				validator: ({ value, form }) => {
					const { fields } = form;
					const { username } = fields;

					if (value.includes(username.value)) {
						return {
							isValid: false,
							error: "Password cannot contain Username",
						};
					}
					return {
						isValid: true,
						error: undefined,
					};
				},
				isActive: ({ username }) => !!username,
			},
		],
		dependencies: ["username"],
	},
];

const handleSubmit = (formData: any) => {
	console.log("Form submitted with:", formData);
};

const form = createForm({ fieldProps: schema, onSubmit: handleSubmit });

function App() {
	return (
		<div>
			<FormGenerator form={form} />
		</div>
	);
}

export default App;
```

## Props

### FieldProps

`FieldProps` is a configuration object used to define the behavior and characteristics of form fields. This configuration is used by the `FormField` to render fields dynamically. Below are the props available in `FieldProps`:

| Prop                     | Type                                                      | Description                                                                                                                                                                    |
| ------------------------ | --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `name`                   | `string`                                                  | The unique identifier for the field.                                                                                                                                           |
| `label`                  | `string`                                                  | The label displayed for the field.                                                                                                                                             |
| `type`                   | `TFieldComponentType`                                     | The type of the field component (e.g., text, dropdown).                                                                                                                        |
| `customComponent`        | `FunctionComponent`                                       | A custom React component that can be used to render the field instead of the default component.                                                                                |
| `rules`                  | `TSynergyRules`                                           | Validation rules defined for the field, such as `required` or `minLength`.                                                                                                     |
| `customRules`            | `TCustomRules`                                            | An array of custom validation rules specific to the field. Each rule includes a name and validation function.                                                                  |
| `placeholder`            | `string`                                                  | Placeholder text to display in the field.                                                                                                                                      |
| `dependencies`           | `Array<string>`                                           | Defines field dependencies. This array contains other field names that the current field depends on for validation or behavior.                                                |
| `getItems`               | `TGeTSelectableItemsFunc`                                 | A function to fetch selectable items for fields such as dropdowns or radio buttons. It can be synchronous or asynchronous.                                                     |
| `hideField`              | `boolean \| (values: any) => boolean`                     | Determines if the field should be hidden. Can be a boolean or a function that returns a boolean based on form values.                                                          |
| `items`                  | `Array<TSelectableItem>`                                  | A static array of items used for dropdown or radio fields.                                                                                                                     |
| `fieldClassName`         | `string`                                                  | CSS class applied to the field container.                                                                                                                                      |
| `labelClassName`         | `string`                                                  | CSS class applied to the field label.                                                                                                                                          |
| `errorClassName`         | `string`                                                  | CSS class applied to the error message container.                                                                                                                              |
| `inputClassName`         | `string`                                                  | CSS class applied to the field input element.                                                                                                                                  |
| `filter`                 | `any`                                                     | An object containing filter criteria used for fetching selectable items.                                                                                                       |
| `updateFilter`           | `(filter: any) => any`                                    | A function to update the filter object when fetching items dynamically.                                                                                                        |
| `watch`                  | `(field: TFormField) => void`                             | A callback that is triggered when the field's value changes.                                                                                                                   |
| `fieldsToUpdateOnChange` | `Array<{name: string, updateFunc: (values: any) => any}>` | An array of field objects that are updated when the value of this field changes. `updateFunc` receives current form values and returns the updated value for the target field. |

### FormField

`FormField` represents an individual field in the form. It is created based on the configuration from `FieldProps`. Here are the properties available in `FormField`:

| Prop                        | Type                                                      | Description                                                                                                                                                |
| --------------------------- | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                      | `string`                                                  | The unique identifier for the field.                                                                                                                       |
| `label`                     | `string`                                                  | The label displayed for the field.                                                                                                                         |
| `type`                      | `TFieldComponentType`                                     | The type of the field component (e.g., text, dropdown).                                                                                                    |
| `value`                     | `any`                                                     | The current value of the field.                                                                                                                            |
| `onChange`                  | `ChangeEventHandler<HTMLInputElement>`                    | Event handler that triggers when the field's value changes.                                                                                                |
| `component`                 | `TSynergyFieldComponent`                                  | The custom component used to render the field.                                                                                                             |
| `id`                        | `string`                                                  | The unique identifier for the field.                                                                                                                       |
| `isValid`                   | `boolean`                                                 | Whether the field is valid based on validation rules.                                                                                                      |
| `error`                     | `string \| undefined`                                     | The error message for the field, if validation fails.                                                                                                      |
| `dependencies`              | `Array<string>`                                           | An array of field names this field depends on for validation or behavior.                                                                                  |
| `rules`                     | `Array<TRule>`                                            | An array of validation rules applied to the field.                                                                                                         |
| `form`                      | `TForm`                                                   | The form that this field belongs to.                                                                                                                       |
| `errors`                    | `Array<{ error: string; rule: string }>`                  | An array of error objects, each containing an error message and the rule that caused the error.                                                            |
| `hasChanged`                | `() => boolean`                                           | Returns `true` if the field's value has changed from its initial state.                                                                                    |
| `clear`                     | `() => void`                                              | Clears the field's value.                                                                                                                                  |
| `reset`                     | `() => void`                                              | Resets the field's value to its initial state.                                                                                                             |
| `disable`                   | `() => void`                                              | Disables the field, preventing user interaction.                                                                                                           |
| `enable`                    | `() => void`                                              | Enables the field for user interaction.                                                                                                                    |
| `disabled`                  | `boolean`                                                 | Whether the field is currently disabled.                                                                                                                   |
| `placeholder`               | `string \| undefined`                                     | The placeholder text displayed in the field.                                                                                                               |
| `setRules`                  | `() => void`                                              | Sets the validation rules for the field.                                                                                                                   |
| `appendDependencyCallbacks` | `() => void`                                              | Appends callbacks for field dependencies to handle conditional logic.                                                                                      |
| `fieldsToUpdateOnChange`    | `Array<{name: string, updateFunc: (values: any) => any}>` | Defines fields to update when this field changes. Each object contains a field `name` and an `updateFunc` that returns the new value based on form values. |

### Form

`Form` represents the structure and behavior of a form, providing a dictionary of fields, error handling, and form lifecycle methods. Below are the properties available in `Form`:

| Prop          | Type                                                                       | Description                                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fields`      | `{ [key: string]: TFormField }`                                            | A dictionary where each key is the name of a field and the value is a `TFormField` object that contains the configuration and state of the field.           |
| `errors`      | `Array<{ field: string; errors: Array<{ rule: string; error: string }> }>` | An array of error objects for the form. Each object contains a `field` name and an array of `errors` related to that field, including the rule and message. |
| `options`     | `TOptions`                                                                 | A configuration object containing various settings and options for the form.                                                                                |
| `onSubmit`    | `Function`                                                                 | The function that will be called when the form is submitted.                                                                                                |
| `isValid`     | `boolean`                                                                  | A boolean indicating whether the form is valid based on its fields and validation rules.                                                                    |
| `values`      | `{ [key: string]: any }`                                                   | A dictionary of the current values of the form fields, indexed by their field names.                                                                        |
| `entity`      | `any`                                                                      | The entity associated with the form, which can store context or additional data related to the form.                                                        |
| `addField`    | `(field: TFormField) => void`                                              | A method to add a new field to the form. The argument is a `TFormField` object.                                                                             |
| `hasChanged`  | `() => boolean`                                                            | Checks if any of the form's values have changed from their initial state. Returns `true` if any value has changed, otherwise `false`.                       |
| `clear`       | `() => void`                                                               | Clears all values in the form, resetting them to empty or default values.                                                                                   |
| `reset`       | `() => void`                                                               | Resets the form values to their initial state (typically the state when the form was first loaded or initialized).                                          |
| `disable`     | `() => void`                                                               | Disables all fields in the form, making them unmodifiable.                                                                                                  |
| `enable`      | `() => void`                                                               | Enables all fields in the form, allowing user interaction and modifications.                                                                                |
| `clearErrors` | `() => void`                                                               |

## Hooks

### `createField(fieldProps: TFieldProps, form: TForm, addToForm: boolean = true)`

Creates a new field based on the provided field properties.

### `createForm<TEntity>({ EntityClass, fieldProps, onSubmit, options, entity, }: { fieldProps: Array<TFieldProps>; onSubmit: Function; options?: TOptions; entity?: TEntity EntityClass?: new () => TEntity; })`

Creates a new form based on the provided form properties.

### `replaceComponent(type: TFieldComponentType, component: TSynergyFieldComponent)`

Replaces the component with the specified type, so that it is automatically used whenever the field with the specified type is created.

### `replaceRule ({ name, validator, }: { name: TSynergyRule; validator: (values: any) => { isValid: boolean; error: string | undefined }; })`

Replaces the rule with the specified name, so that it is automatically used whenever the rule with the specified type is called.

### `setComponents(components: { [key: string]: TSynergyFieldComponent })`

Performs the same function as replaceComponent, but for multiple components at once.

### `setRules(rules: Array<{ name: TSynergyRule; validator: (values: any) => { isValid: boolean; error: string | undefined; }; }>)`

Performs the same function as replaceRule, but for multiple rules at once.
