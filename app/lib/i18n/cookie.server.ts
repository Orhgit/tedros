import { createCookie } from "react-router";
import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

const ONE_YEAR = 60 * 60 * 24 * 365;

export const localeCookie = createCookie("tedros_locale", {
  maxAge: ONE_YEAR,
  httpOnly: false,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
});

export async function readLocaleCookie(request: Request): Promise<Locale> {
  const value = await localeCookie.parse(request.headers.get("cookie"));
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export async function serializeLocaleCookie(locale: Locale): Promise<string> {
  return localeCookie.serialize(locale);
}
