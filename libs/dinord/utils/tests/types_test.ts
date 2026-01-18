import { assert } from "@std/assert";
import { isNull, isNullOrUndefined, isString, isUndefined } from "../types.ts";

Deno.test("isNull, isUndefined and isNullOrUndefined", () => {
	assert(isNull(null));
	assert(!isNull(undefined));
	assert(isUndefined(undefined));
	assert(!isUndefined(null));
	assert(isNullOrUndefined(null));
	assert(isNullOrUndefined(undefined));
	assert(!isNullOrUndefined(0));
});

Deno.test("isString", () => {
	assert(isString("hello"));
	assert(!isString(123));
});
