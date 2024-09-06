import { each, filter, find, isEmpty, isFunction, map } from "lodash";
import { action, computed, makeObservable, observable } from "mobx";
import {
	TDropdownStore,
	TGeTSelectableItemsFunc,
	TSelectableItem,
} from "synergy-form-generator/types";

type TConfig = {
	getItems?: TGeTSelectableItemsFunc;
	setValue: (value: any) => void;
	items?: Array<TSelectableItem>;
};

class DropdownStore implements TDropdownStore {
	fetchFunc: TGeTSelectableItemsFunc = () => [];
	_items: Array<
		TSelectableItem & {
			isSelected?: boolean;
		}
	> = [];
	isMulti: boolean = true;
	setValue: (value: any) => void;
	itemsWidth: number = 0;

	constructor({ getItems, setValue, items = [] }: TConfig) {
		makeObservable(this, {
			selectItem: action,
			selectItems: action,
			setItems: action,

			_items: observable,

			items: computed,
			selectedItems: computed,
			selectedItem: computed,
		});
		this.setValue = setValue;
		if (isFunction(getItems)) {
			this.fetchFunc = getItems;
		}
		if (isEmpty(items)) {
			this.getItems();
		} else {
			this.setItems(items);
		}
	}

	get selectedItem() {
		return find(this._items, (item) => item.isSelected) as TSelectableItem;
	}

	get selectedItems() {
		return filter(
			this._items,
			(item) => item.isSelected
		) as Array<TSelectableItem>;
	}

	get items() {
		const items = filter(this._items, (item) => !item.isSelected);
		return items;
	}

	selectItem = ({ id }: TSelectableItem) => {
		this._items = map(this._items, (item) => {
			item.isSelected = item.id === id;
			return item;
		});
		this.setValue(this.isMulti ? this.selectedItems : this.selectedItem);
	};

	selectItems = (items: Array<TSelectableItem>) => {
		if (isEmpty(items)) each(this._items, (i) => (i.isSelected = false));
		each(items, (item) => this.selectItem(item));
	};

	setItems(items: Array<TSelectableItem>) {
		this._items = items;
	}

	getItems = async () => {
		//TODO: Implement actual fetching results with filtering
		const result = this.fetchFunc({});
		if (result instanceof Promise) {
			try {
				const response = await result;
				this.setItems(response);
			} catch (error) {
				if (error) console.error(error);
				this.setItems([]);
			}
		} else {
			this.setItems(result);
		}
	};
}

export default DropdownStore;
