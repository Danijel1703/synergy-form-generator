import { observer } from "mobx-react";
import Select from "react-select";
import {
	TDropdownStore,
	TSynergyFieldComponent,
} from "synergy-form-generator/types";

function DropdownInput({ dropdownStore }: { dropdownStore: TDropdownStore }) {
	const { isMulti, getItems, items, selectItem, selectItems } = dropdownStore;
	return (
		<>
			<Select
				onMenuOpen={getItems}
				isMulti={isMulti}
				options={items}
				onChange={isMulti ? selectItems : selectItem}
				closeMenuOnSelect={!isMulti}
				onMenuScrollToBottom={getItems}
			/>
		</>
	);
}

export default observer(DropdownInput as TSynergyFieldComponent);
