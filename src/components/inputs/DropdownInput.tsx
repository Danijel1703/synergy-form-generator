import { map } from "lodash";
import { observer } from "mobx-react";
import "styles/Dropdown.Module.css";
import { TDropdownItem, TFieldComponentProps } from "~/types";

function DropdownInput(props: TFieldComponentProps) {
	const { dropdownStore } = props;
	if (!dropdownStore) return <></>;
	const {
		isMulti,
		items,
		isOpen,
		toggleIsOpen,
		selectedItem,
		selectItem,
		selectedItems,
		setRef,
	} = dropdownStore;
	const Dropdown = isMulti ? (
		<MultiDropown
			items={items}
			isOpen={isOpen}
			toggleIsOpen={toggleIsOpen}
			selectedItems={selectedItems}
			selectItem={selectItem}
		/>
	) : (
		<SingleDropown
			items={items}
			isOpen={isOpen}
			toggleIsOpen={toggleIsOpen}
			selectedItem={selectedItem}
			selectItem={selectItem}
		/>
	);
	return (
		<div className="dropdown" ref={setRef}>
			{Dropdown}
		</div>
	);
}

const SingleDropown = observer(
	({
		toggleIsOpen,
		selectedItem,
		isOpen,
		items,
		selectItem,
	}: {
		items: Array<TDropdownItem>;
		selectedItem?: TDropdownItem;
		toggleIsOpen: Function;
		selectItem: (id: string) => void;
		isOpen: boolean;
	}) => {
		return (
			<>
				<div className="dropdown--input" onClick={toggleIsOpen}>
					{selectedItem ? selectedItem.label : "Default"}
				</div>
				{isOpen && (
					<div className="dropdown--items">
						{map(items, (item) => (
							<div
								key={item.id}
								className="dropdown--items--item"
								onClick={() => selectItem(item.id)}
							>
								{item.label}
							</div>
						))}
					</div>
				)}
			</>
		);
	}
);

const MultiDropown = observer(
	({
		toggleIsOpen,
		selectedItems,
		isOpen,
		items,
		selectItem,
	}: {
		items: Array<TDropdownItem>;
		selectedItems?: Array<TDropdownItem>;
		toggleIsOpen: Function;
		selectItem: (id: string) => void;
		isOpen: boolean;
	}) => {
		return (
			<>
				<div className="dropdown--input" onClick={toggleIsOpen}>
					{/* {selectedItems ? selectedItems.label : "Default"} */}
				</div>
				{isOpen && (
					<div className="dropdown--items">
						{map(items, (item) => (
							<div
								key={item.id}
								className="dropdown--items--item"
								onClick={() => selectItem(item.id)}
							>
								{item.label}
							</div>
						))}
					</div>
				)}
			</>
		);
	}
);

export default observer(DropdownInput);
