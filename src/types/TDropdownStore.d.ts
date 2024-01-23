import { TDropdownItem, TGetDropdownItemsFunc } from ".";

interface TDropdownStore {
	getItems: () => void;
	items: Array<TDropdownItem>;
	selectedItem?: TDropdownItem;
	selectedItems?: Array<TDropdownItem>;
	toggleIsOpen: Function;
	selectItem: (id: string | number) => void;
	isOpen: boolean;
	setRef: (ref: any) => void;
	isMulti: boolean;
	setIsOpen: (isOpen: boolean) => void;
	setValue: (value: any) => void;
	deselectItem: (id: string | number) => void;
	setInputRef: (ref: any) => void;
	setItemsRef: (ref: any) => void;
	itemsWidth: number;
}

export default TDropdownStore;
