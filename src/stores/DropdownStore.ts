import { concat, each, filter, find, isEmpty, isFunction, map } from "lodash";
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
	filter?: any;
	updateFilter: (filter: any) => any;
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
	filter: any = {};
	updateFilter: (filter: any) => any;

	constructor({
		getItems,
		setValue,
		items = [],
		filter,
		updateFilter,
	}: TConfig) {
		makeObservable(this, {
			selectItem: action,
			selectItems: action,
			setItems: action,

			_items: observable,

			items: computed,
			selectedItems: computed,
			selectedItem: computed,
		});
		this.filter = filter;
		this.updateFilter = updateFilter;
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
		const result = this.fetchFunc(this.filter);
		if (result instanceof Promise) {
			try {
				const response = await result;
				if (this.items === response) return;
				this.setItems(concat(this.items, response));
				this.updateFilter(this.filter);
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
