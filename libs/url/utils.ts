export const joinURL = (base: string, ...parts: string[]): string => {
  const cleanBase = base.replace(/(?<!:)\/+$/, "");
  if (parts.length === 0) return cleanBase;

  const validParts = parts.filter((part) => part.trim() !== "");
  if (validParts.length === 0) return cleanBase;

  return validParts.reduce((acc, curr, index) => {
    const nextPart = curr.replace(/^(\/+)/, "").replace(/(\/+)$/, "");

    if (index > 0 && nextPart === "") return acc;
    return `${acc}/${nextPart}`;
  }, cleanBase);
};
