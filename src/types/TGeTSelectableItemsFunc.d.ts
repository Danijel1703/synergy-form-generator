import { TSelectableItem } from ".";

type TGeTSelectableItemsFunc =
	| (() => Array<TSelectableItem>)
	| (() => Promise<Array<TSelectableItem>>)
	| ((filter: any) => Array<TSelectableItem>)
	| ((filter: any) => Promise<Array<TSelectableItem>>);

export default TGeTSelectableItemsFunc;
