import { map } from "lodash";
import { observer } from "mobx-react";
import React from "react";
import "styles/Dropdown.Module.css";
import { TFieldComponentProps } from "~/types";

function DropdownInput(props: TFieldComponentProps) {
	const { dropdownStore } = props;
	if (!dropdownStore) return <></>;
	const { items, isOpen, toggleIsOpen, selectedItem, selectItem, setRef } =
		dropdownStore;
	return (
		<div
			className="dropdown"
			style={{
				marginTop: "600px",
				position: "absolute",
			}}
			ref={setRef}
		>
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
		</div>
	);
}

export default observer(DropdownInput);
