import { filter, find, map, orderBy } from "lodash";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { TDropdownItem, TGetDropdownItemsFunc } from "~/types";
import { onOutsideClick } from "~/utils";

type TConfig = {
	getItems: TGetDropdownItemsFunc;
};

class DropdownStore {
	fetchFunc: TGetDropdownItemsFunc;
	_items: Array<
		TDropdownItem & {
			isSelected?: boolean;
			orderNumber?: number;
		}
	> = [];
	isOpen: boolean = false;

	constructor({ getItems }: TConfig) {
		makeObservable(this, {
			getItems: action,
			toggleIsOpen: action,
			selectItem: action,
			_items: observable,
			isOpen: observable,
			items: computed,
			selectedItems: computed,
			selectedItem: computed,
		});
		this.fetchFunc = getItems;
		this.getItems();
	}

	get selectedItem() {
		return find(this._items, (item) => item.isSelected);
	}

	get selectedItems() {
		return filter(this._items, (item) => item.isSelected);
	}

	get items() {
		const items = filter(this._items, (item) => !item.isSelected);
		return orderBy(items, "orderNumber");
	}

	selectItem = (id: string) => {
		this._items = map(this._items, (item) => {
			item.isSelected = item.id === id;
			return item;
		});
	};

	setRef = (ref: HTMLDivElement) => {
		this.ref = ref;
		if (!ref) return;
		onOutsideClick(ref, () => {
			if (this.isOpen) this.toggleIsOpen();
		});
	};

	toggleIsOpen = () => {
		this.isOpen = !this.isOpen;
	};

	async getItems() {
		const result = this.fetchFunc();
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
}

export default DropdownStore;
