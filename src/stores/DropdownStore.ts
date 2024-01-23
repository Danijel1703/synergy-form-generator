import { filter, find, map, orderBy } from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import { TDropdownItem, TDropdownStore, TGetDropdownItemsFunc } from "~/types";
import { onOutsideClick } from "~/utils";

type TConfig = {
	getItems: TGetDropdownItemsFunc;
	setValue: (value: any) => void;
};

class DropdownStore implements TDropdownStore {
	fetchFunc: TGetDropdownItemsFunc;
	_items: Array<
		TDropdownItem & {
			isSelected?: boolean;
			orderNumber?: number;
		}
	> = [];
	isOpen: boolean = false;
	isMulti: boolean = true;
	ref!: HTMLDivElement;
	inputRef!: HTMLDivElement;
	itemsRef!: HTMLDivElement;
	setValue: (value: any) => void;
	itemsWidth: number = 0;

	constructor({ getItems, setValue }: TConfig) {
		makeObservable(this, {
			getItems: action,
			toggleIsOpen: action,
			selectItem: action,
			deselectItem: action,
			setItemsWidth: action,
			_items: observable,
			isOpen: observable,
			itemsWidth: observable,
			items: computed,
			selectedItems: computed,
			selectedItem: computed,
		});
		this.setValue = setValue;
		this.fetchFunc = getItems;
		this.getItems();
	}

	get selectedItem() {
		return find(this._items, (item) => item.isSelected) as TDropdownItem;
	}

	get selectedItems() {
		return filter(
			this._items,
			(item) => item.isSelected
		) as Array<TDropdownItem>;
	}

	get items() {
		const items = filter(this._items, (item) => !item.isSelected);
		return orderBy(items, "orderNumber");
	}

	selectItem = (id: string | number) => {
		this._items = map(this._items, (item) => {
			if (!this.isMulti) {
				item.isSelected = item.id === id;
			} else {
				item.isSelected = item.isSelected || item.id === id;
			}
			return item;
		});
		this.setIsOpen(this.isMulti);
		this.setValue(this.isMulti ? this.selectedItems : this.selectedItem);
	};

	deselectItem = (id: string | number) => {
		this._items = map(this._items, (item) => {
			if (item.id === id) {
				item.isSelected = false;
			}
			return item;
		});
	};

	setRef = (ref: HTMLDivElement) => {
		this.ref = ref;
		if (!ref) return;
		// Make this function better and a proper util
		onOutsideClick(ref, () => {
			this.setIsOpen(false);
		});
	};

	setInputRef = (ref: HTMLDivElement) => {
		this.inputRef = ref;
	};

	setItemsRef = (ref: HTMLDivElement) => {
		if (!ref) return;
		this.itemsRef = ref;
		this.setItemsWidth(this.inputRef.offsetWidth);
	};

	toggleIsOpen = (e: Event) => {
		if (this.inputRef !== e.target) return;
		this.isOpen = !this.isOpen;
	};

	setIsOpen = (isOpen: boolean) => {
		this.isOpen = isOpen;
	};

	async getItems() {
		const result = this.fetchFunc({});
		if (result instanceof Promise) {
			try {
				const response = await result;
				this._items = response;
			} catch (error) {
				if (error) console.error(error);
				this._items = [];
			}
		} else {
			this._items = result;
		}
		this._items = map(this._items, (value, index) => {
			value.orderNumber = index;
			return value;
		});
	}

	setItemsWidth = (width: number) => {
		this.itemsWidth = width;
	};
}

export default DropdownStore;
