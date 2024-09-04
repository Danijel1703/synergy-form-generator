import { observer } from "mobx-react";
import Select from "react-select";
import { TDropdownStore, TSynergyFieldComponent } from "~/types";

function DropdownInput({ dropdownStore }: { dropdownStore: TDropdownStore }) {
	const { isMulti, getItems, items, selectItem, selectItems } = dropdownStore;
	return (
		<Select
			onMenuOpen={getItems}
			isMulti={isMulti}
			options={items}
			onChange={isMulti ? selectItems : selectItem}
			closeMenuOnSelect={!isMulti}
		/>
	);
}

export default observer(DropdownInput as TSynergyFieldComponent);
