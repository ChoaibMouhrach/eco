export const parse = (rawCookies: string[]): Record<string, string> => {
  let cookies = {};

  for (let rawCookie of rawCookies) {
    let splitedRawCookie = rawCookie.split("=");
    cookies[splitedRawCookie[0]] = splitedRawCookie[1]
  }

  return cookies
}
