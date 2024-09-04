import { TSynergyFieldComponent } from "~/types";
import {
	ColorInput,
	DateInput,
	DropdownInput,
	EmailInput,
	FileInput,
	MonthInput,
	PasswordInput,
	PhoneInput,
	RadioInput,
	TextInput,
	TimeInput,
	UrlInput,
	WeekInput,
} from ".";
import CheckboxInput from "./inputs/CheckboxInput";

const inputComponents: { [key: string]: TSynergyFieldComponent } = {
	text: TextInput,
	password: PasswordInput,
	dropdown: DropdownInput,
	color: ColorInput,
	email: EmailInput,
	file: FileInput,
	month: MonthInput,
	tel: PhoneInput,
	time: TimeInput,
	url: UrlInput,
	week: WeekInput,
	radio: RadioInput,
	checkbox: CheckboxInput,
	date: DateInput,
};

export default inputComponents;
