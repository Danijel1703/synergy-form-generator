import { TFormFieldBase } from '.';

type TFormField = TFormFieldBase & {
	validators: Array<
		(value: any) => { isValid: boolean; error: string | undefined }
	>;
	addFormReference: Function;
	dynamicRules: object;
	toggleDynamicRules: Function;
	resetError: () => void;
};

export default TFormField;
