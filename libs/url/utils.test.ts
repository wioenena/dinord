import { assertEquals } from "@std/assert";
import { joinURL } from "./utils.ts";

Deno.test("joinURL", () => {
  const base = "https://example.site";
  assertEquals(joinURL(base), base);
  assertEquals(joinURL(base + "////"), base);
  assertEquals(joinURL(base, "///path", "to///", "///resource///"), `${base}/path/to/resource`);
});
