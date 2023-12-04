import { TDropdownItem, TGetDropdownItemsFunc } from ".";

type TDropdownStore = {
	getItems: TGetDropdownItemsFunc;
	items: Array<TDropdownItem>;
	selectedItem: TDropdownItem;
	selectedItems: Array<TDropdownItem>;
	toggleIsOpen: Function;
	selectItem: (id: string) => void;
	isOpen: boolean;
};

export default TDropdownStore;
