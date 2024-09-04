import { TFieldComponentType } from "~/types";

const fieldTypeConstants = {
	text: "text",
	password: "password",
	number: "number",
	date: "date",
	email: "email",
	file: "file",
	month: "month",
	radio: "radio",
	reset: "reset",
	submit: "submit",
	phone: "tel",
	time: "time",
	url: "url",
	week: "week",
	checkbox: "checkbox",
	color: "color",
	button: "button",
	dropdown: "dropdown",
};
export default fieldTypeConstants as { [key: string]: TFieldComponentType };
