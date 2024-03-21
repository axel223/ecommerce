import cookie, { type CookieSerializeOptions } from "cookie";
import { type NextApiRequest, type NextApiResponse } from "next";

const getCookie = (req: NextApiRequest, name: string) => {
  const cookie = req.cookies;
  if (!cookie) return;
  return req.cookies[name];
};

const setCookie = (
  res: NextApiResponse,
  name: string,
  value: string,
  options?: CookieSerializeOptions,
) => {
  res.setHeader("Set-Cookie", cookie.serialize(name, value, options));
};

const deleteCookie = (
  res: NextApiResponse,
  name: string,
  options?: CookieSerializeOptions,
) => {
  res.setHeader("Set-Cookie", cookie.serialize(name, "", options));
};

export const Cookies = {
  get: getCookie,
  set: setCookie,
  delete: deleteCookie,
};
