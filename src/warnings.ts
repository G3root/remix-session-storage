/*!
 * Original code by Remix Software Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/warnings.ts
 */

const alreadyWarned: { [message: string]: boolean } = {}

export function warnOnce(condition: boolean, message: string): void {
  if (!condition && !alreadyWarned[message]) {
    alreadyWarned[message] = true
    console.warn(message)
  }
}
