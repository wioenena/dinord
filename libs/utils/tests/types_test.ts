import { assert } from "@std/assert";
import { isGreaterThan, isNull, isNullOrUndefined, isNumber, isString, isUndefined } from "../types.ts";

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

Deno.test("isNumber and isGreaterThan", () => {
  assert(isNumber(123));
  assert(!isNumber("hello"));
  assert(isGreaterThan(123, 100));
  assert(!isGreaterThan(123, 200));
});
