/*!
 * Original code by Remix Software Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix/blob/main/packages/remix-server-runtime/crypto.ts
 */

export type SignFunction = (value: string, secret: string) => Promise<string>

export type UnsignFunction = (
  cookie: string,
  secret: string,
) => Promise<string | false>

const encoder = new TextEncoder()

export const sign: SignFunction = async (value, secret) => {
  const data = encoder.encode(value)
  const key = await createKey(secret, ["sign"])
  const signature = await crypto.subtle.sign("HMAC", key, data)
  const hash = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(
    /=+$/,
    "",
  )

  return value + "." + hash
}

export const unsign: UnsignFunction = async (cookie, secret) => {
  const value = cookie.slice(0, cookie.lastIndexOf("."))
  const hash = cookie.slice(cookie.lastIndexOf(".") + 1)

  const data = encoder.encode(value)
  const key = await createKey(secret, ["verify"])
  const signature = byteStringToUint8Array(atob(hash))
  const valid = await crypto.subtle.verify("HMAC", key, signature, data)

  return valid ? value : false
}

async function createKey(
  secret: string,
  usages: CryptoKey["usages"],
): Promise<CryptoKey> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    usages,
  )

  return key
}

function byteStringToUint8Array(byteString: string): Uint8Array {
  const array = new Uint8Array(byteString.length)

  for (let i = 0; i < byteString.length; i++) {
    array[i] = byteString.charCodeAt(i)
  }

  return array
}
