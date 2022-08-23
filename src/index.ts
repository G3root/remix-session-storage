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
