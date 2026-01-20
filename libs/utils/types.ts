export const isNull = (value: unknown) => value === null;

export const isUndefined = (value: unknown) => value === undefined;

export const isNullOrUndefined = (value: unknown) =>
  isNull(value) || isUndefined(value);

export const isString = (value: unknown) => typeof value === "string";

export const isNumber = (value: unknown) => typeof value === "number";

export const isGreaterThan = (value: number, min: number) => value > min;
