/* eslint-disable no-promise-executor-return */
/* eslint-disable @typescript-eslint/no-invalid-void-type */
/**
 * Function
 */
export type Fn<T = void> = () => T;

/**
 * Promised `setTimeout`
 *
 * @category Promise
 */
export function sleep(ms: number, callback?: Fn<any>) {
  return new Promise<void>((resolve) =>
    setTimeout(async () => {
      await callback?.();
      resolve();
    }, ms),
  );
}
