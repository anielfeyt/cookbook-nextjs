export function kebabCase(str: string) {
  const string = encodeURIComponent(
    str.trim().replace(/\s+/g, "-").toLowerCase()
  );
  return string;
}
