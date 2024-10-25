import { observer } from "mobx-react";
import Select from "react-select";
import { TFieldComponentProps } from "synergy-form-generator/types";

function DropdownInput(props: TFieldComponentProps) {
	const { dropdownStore } = props;
	const { isMulti, getItems, items, selectItem, selectItems } = dropdownStore;
	return (
		<Select
			onMenuOpen={getItems}
			isMulti={isMulti}
			options={items}
			onChange={isMulti ? selectItems : selectItem}
			closeMenuOnSelect={!isMulti}
			onMenuScrollToBottom={getItems}
		/>
	);
}

export default observer(DropdownInput);
