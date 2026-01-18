export const defProp = <O extends object>(
  object: O,
  key: PropertyKey,
  value: unknown,
  {
    configurable = false,
    writable = false,
    enumerable = true,
  }: Pick<
    PropertyDescriptor & ThisType<O>,
    "configurable" | "writable" | "enumerable"
  > = {},
) => {
  Object.defineProperty(object, key, {
    value,
    configurable,
    writable,
    enumerable,
  });
};
