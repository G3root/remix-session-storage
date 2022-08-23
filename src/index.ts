/*!
 * Original code by Remix Software Inc
 * MIT Licensed, Copyright(c) 2021 Remix software Inc, see LICENSE for details
 *
 * Credits to the Remix team:
 * https://github.com/remix-run/remix
 */

import { createCookieFactory } from "./cookies"
import { createCookieSessionStorageFactory } from "./cookieStorage"
import { createSessionStorageFactory } from "./sessions"
import { sign, unsign } from "./crypto"
import { createMemorySessionStorageFactory } from "./memoryStorage"

export * from "cookie"
export const createCookie = createCookieFactory({ sign: sign, unsign: unsign })
export const createCookieSessionStorage =
  createCookieSessionStorageFactory(createCookie)
export const createSessionStorage = createSessionStorageFactory(createCookie)
export const createMemorySessionStorage =
  createMemorySessionStorageFactory(createSessionStorage)
