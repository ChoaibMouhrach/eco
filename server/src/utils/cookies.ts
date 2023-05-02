/**
* Use to convert raw cookies gotten from headers into a key value object
* @param rawCookies string [] the cookies from headers
* */
export const parse = (rawCookies: string[]) => {
  const cookies: Record<string, string> = {}

  for (let rawCookie of rawCookies) {
    let splitRawCookie = rawCookie.split("=")
    cookies[splitRawCookie[0]] = splitRawCookie[1]
  }

  return cookies
}
