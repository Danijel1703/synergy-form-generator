const errorConstants = {
	required: "This field is required.",
	min: "The value must be at least the minimum allowed.",
	max: "The value must not exceed the maximum allowed.",
	mustContainUpper: "The value must contain at least one uppercase letter.",
	mustContainLower: "The value must contain at least one lowercase letter.",
	mustContainSpecial: "The value must contain at least one special character.",
	decimal: "The value must be a decimal number.",
	upperCaseOnly: "The value must contain only uppercase letters.",
	lowerCaseOnly: "The value must contain only lowercase letters.",
	mustContainDigit: "The value must contain at least one digit.",
	noWhitespace: "The value must not contain any whitespace.",
	mustStartWith: "The value must start with the specified character(s).",
	mustEndWith: "The value must end with the specified character(s).",
	notContain: "The value must not contain the specified character(s).",
	length: "The value must be the specified length.",
	exactLength: "The value must be exactly the specified length.",
	email: "The value must be a valid email address.",
	URL: "The value must be a valid URL.",
	alphanumeric: "The value must contain only letters and numbers.",
	numeric: "The value must be a numeric value.",
	uuid: "The value must be a valid UUID.",
	hexadecimal: "The value must be a valid hexadecimal number.",
	base64: "The value must be a valid Base64 string.",
	in: "The value must be one of the allowed options.",
	notIn: "The value must not be one of the disallowed options.",
	unexpectedError: "An unexpected error ocurred.",
};

export default errorConstants;
