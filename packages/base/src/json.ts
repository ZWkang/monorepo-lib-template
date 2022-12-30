export function safeParse<G extends Record<string, unknown>, T>(str: string, defaultValue: T): T | G {
  try {
    return JSON.parse(str);
  } catch (e) {
    return defaultValue;
  }
}

export function safeStringify<T extends Record<string, unknown>, G>(val: T, defaultValue: G): G | string {
  try {
    return JSON.stringify(val);
  } catch (e) {
    return defaultValue;
  }
}
