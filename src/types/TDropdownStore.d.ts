import { TSelectableItem, TGeTSelectableItemsFunc } from ".";

interface TDropdownStore {
	getItems: () => void;
	items: Array<TSelectableItem>;
	selectedItem?: TSelectableItem;
	selectedItems?: Array<TSelectableItem>;
	selectItem: (item: TSelectableItem) => void;
	selectItems: (items: Array<TSelectableItem>) => void;
	isMulti: boolean;
	setValue: (value: any) => void;
	updateFilter: (filter: any) => any;
	filter: any;
}

export default TDropdownStore;
