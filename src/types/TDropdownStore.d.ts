import { TDropdownItem, TGetDropdownItemsFunc } from ".";

interface TDropdownStore {
	getItems: () => void;
	items: Array<TDropdownItem>;
	selectedItem?: TDropdownItem;
	selectedItems?: Array<TDropdownItem>;
	toggleIsOpen: Function;
	selectItem: (id: string) => void;
	isOpen: boolean;
	setRef: (ref: any) => void;
	isMulti: boolean;
	setIsOpen: (isOpen: boolean) => void;
	setValue: (value: any) => void;
}

export default TDropdownStore;
