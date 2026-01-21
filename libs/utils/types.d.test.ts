import type { PickFromArray, StrictSubSet } from "./types.d.ts";

type ParentSet = "a" | "b" | "c";

type _StrictSubSetSuccess = StrictSubSet<"a", ParentSet>;

// @ts-expect-error
type _StrictSubSetFail = StrictSubSet<"d", ParentSet>;

type _PickFromArraySuccess = PickFromArray<[1, 2, 3], 2>;

// @ts-expect-error
type _PickFromArrayFail = PickFromArray<[1, 2, 3], 4>;
