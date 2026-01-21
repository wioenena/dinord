export type StrictSubSet<TSubSet extends TParentSet, TParentSet> = TSubSet;
export type ArrayElement<TArray extends readonly unknown[]> = TArray[number];
export type PickFromArray<TArray extends readonly unknown[], TElement extends ArrayElement<TArray>> = TElement;
