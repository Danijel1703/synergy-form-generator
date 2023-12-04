import { TDropdownItem } from ".";

type TGetDropdownItemsFunc =
	| (() => Array<TDropdownItem>)
	| ((filter: any) => Array<TDropdownItem>)
	| ((filter: any) => Promise<Array<TDropdownItem>>);

export default TGetDropdownItemsFunc;
