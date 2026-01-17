export const asyncSleep = (ms: number) =>
	new Promise((resolve) => Deno.unrefTimer(setTimeout(resolve, ms)));
