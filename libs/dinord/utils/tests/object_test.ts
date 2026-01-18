import { assertEquals, assertThrows } from "@std/assert";
import { defProp } from "../mod.ts";

Deno.test("defProp", () => {
	class Obj {
		public readonly foo!: string;
		public readonly bar!: number;

		public constructor() {
			defProp(this, "foo", "bar");
			defProp(this, "bar", 10, {
				configurable: true,
				writable: true,
				enumerable: false,
			});
		}
	}
	const o = new Obj();
	const fooDescriptor = Object.getOwnPropertyDescriptor(o, "foo");
	const barDescriptor = Object.getOwnPropertyDescriptor(o, "bar");

	assertEquals(fooDescriptor, {
		configurable: false,
		writable: false,
		enumerable: true,
		value: "bar",
	});

	assertEquals(barDescriptor, {
		configurable: true,
		writable: true,
		enumerable: false,
		value: 10,
	});

	assertThrows(() => {
		//@ts-expect-error
		delete o.foo;
	});

	assertThrows(() => {
		//@ts-expect-error
		o.foo = "213";
	});
});
