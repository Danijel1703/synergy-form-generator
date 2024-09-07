const errorConstants = {
	required: "The :field: field is required.",
	min: "The value in the :field: field must be at least the minimum allowed.",
	max: "The value in the :field: field must not exceed the maximum allowed.",
	mustContainUpper:
		"The :field: field must contain at least one uppercase letter.",
	mustContainLower:
		"The :field: field must contain at least one lowercase letter.",
	mustContainSpecial:
		"The :field: field must contain at least one special character.",
	decimal: "The :field: field must be a decimal number.",
	upperCaseOnly: "The :field: field must contain only uppercase letters.",
	lowerCaseOnly: "The :field: field must contain only lowercase letters.",
	mustContainDigit: "The :field: field must contain at least one digit.",
	noWhitespace: "The :field: field must not contain any whitespace.",
	mustStartWith:
		"The :field: field must start with the specified character(s).",
	mustEndWith: "The :field: field must end with the specified character(s).",
	notContain: "The :field: field must not contain the specified character(s).",
	length: "The :field: field must be the specified length.",
	exactLength: "The :field: field must be exactly the specified length.",
	email: "The :field: field must be a valid email address.",
	URL: "The :field: field must be a valid URL.",
	alphanumeric: "The :field: field must contain only letters and numbers.",
	numeric: "The :field: field must be a numeric value.",
	uuid: "The :field: field must be a valid UUID.",
	hexadecimal: "The :field: field must be a valid hexadecimal number.",
	base64: "The :field: field must be a valid Base64 string.",
	in: "The :field: field must be one of the allowed options.",
	notIn: "The :field: field must not be one of the disallowed options.",
	unexpectedError: "An unexpected error occurred in the :field: field.",
};

export default errorConstants;
