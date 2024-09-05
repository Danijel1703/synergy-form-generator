type TSynergyRules = {
	required?: boolean | Function;
	min?: number | { isActive: boolean | Function; value: number };
	max?: number | { isActive: boolean | Function; value: number };
	mustContainUpper?: boolean | Function;
	mustContainLower?: boolean | Function;
	mustContainSpecial?: boolean | Function;
	decimal?: boolean | Function;
	upperCaseOnly?: boolean | Function;
	lowerCaseOnly?: boolean | Function;
	mustContainDigit?: boolean | Function;
	noWhitespace?: boolean | Function;
	mustStartWith?:
		| string
		| RegExp
		| { isActive: boolean | Function; value: string | RegExp };
	mustEndWith?:
		| string
		| RegExp
		| { isActive: boolean | Function; value: string | RegExp };
	notContain?:
		| string
		| RegExp
		| { isActive: boolean | Function; value: string | RegExp };
	contain?:
		| string
		| RegExp
		| { isActive: boolean | Function; value: string | RegExp };
	length?:
		| number
		| RegExp
		| { isActive: boolean | Function; value: number | RegExp };
	exactLength?:
		| string
		| RegExp
		| { isActive: boolean | Function; value: string | RegExp };
	email?: boolean | Function;
	URL?: boolean | Function;
	alphanumeric?: boolean | Function;
	numeric?: boolean | Function;
	uuid?: boolean | Function;
	hexadecimal?: boolean | Function;
	base64?: boolean | Function;
	isIn?: Array<any> | { isActive: boolean | Function; value: Array<any> };
	notIn?: Array<any> | { isActive: boolean | Function; value: Array<any> };
};
