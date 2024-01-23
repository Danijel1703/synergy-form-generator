import { isEmpty, map } from "lodash";
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
		deselectItem,
		setInputRef,
		setItemsRef,
		itemsWidth,
	} = dropdownStore;
	const Dropdown = isMulti ? (
		<MultiDropown
			items={items}
			isOpen={isOpen}
			toggleIsOpen={toggleIsOpen}
			selectedItems={selectedItems}
			selectItem={selectItem}
			deselectItem={deselectItem}
			setInputRef={setInputRef}
			setItemsRef={setItemsRef}
			itemsWidth={itemsWidth}
		/>
	) : (
		<SingleDropown
			items={items}
			isOpen={isOpen}
			toggleIsOpen={toggleIsOpen}
			selectedItem={selectedItem}
			selectItem={selectItem}
			setInputRef={setInputRef}
			setItemsRef={setItemsRef}
			itemsWidth={itemsWidth}
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
		setInputRef,
		setItemsRef,
		itemsWidth,
	}: {
		items: Array<TDropdownItem>;
		selectedItem?: TDropdownItem;
		toggleIsOpen: Function;
		selectItem: (id: string | number) => void;
		isOpen: boolean;
		setInputRef: (ref: any) => void;
		setItemsRef: (ref: any) => void;
		itemsWidth: number;
	}) => {
		return (
			<>
				<div
					className="dropdown--input"
					onClick={toggleIsOpen}
					ref={setInputRef}
				>
					{selectedItem ? selectedItem.label : "Default"}
				</div>
				{isOpen && (
					<div
						className="dropdown--items"
						ref={setItemsRef}
						style={{ width: itemsWidth }}
					>
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
		deselectItem,
		setInputRef,
		setItemsRef,
		itemsWidth,
	}: {
		items: Array<TDropdownItem>;
		selectedItems?: Array<TDropdownItem>;
		toggleIsOpen: Function;
		selectItem: (id: string | number) => void;
		isOpen: boolean;
		deselectItem: (id: string | number) => void;
		setInputRef: (ref: any) => void;
		setItemsRef: (ref: any) => void;
		itemsWidth: number;
	}) => {
		return (
			<>
				<div
					className="dropdown--input"
					onClick={toggleIsOpen}
					ref={setInputRef}
				>
					{isEmpty(selectedItems)
						? "Default"
						: map(selectedItems, (selectedItem) => (
								<div>
									{selectedItem.label}
									<button
										onClick={(e) => {
											e.preventDefault();
											deselectItem(selectedItem.id);
										}}
									>
										&#10005;
									</button>
								</div>
						  ))}
				</div>
				{isOpen && (
					<div
						className="dropdown--items"
						ref={setItemsRef}
						style={{ width: itemsWidth }}
					>
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
