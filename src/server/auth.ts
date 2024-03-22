import { jwtVerify } from "jose";
import { EMAIL_JWT, JWT_KEY } from "~/utils/constant";
import { db } from "./db";
import { Cookies } from "./cookies";
import { type NextApiRequest } from "next";
import { getJwtSecret } from "~/lib/auth";
import { TRPCError } from "@trpc/server";

export type IUserInfo = {
  id: string;
  name: string;
  verified: boolean;
} | null;

export const getUserInfo = async (request: NextApiRequest) => {
  const token = Cookies.get(request, JWT_KEY);

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecret()),
    );

    if (!payload?.userId) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Token Error",
      });
    }

    return db.user.findUnique({
      where: { id: payload.userId as number },
      select: {
        id: true,
        name: true,
        verified: true,
      },
    });
  } catch (error) {
    return null;
  }
};

export const getUserInfoByEmail = async (request: NextApiRequest) => {
  const token = Cookies.get(request, EMAIL_JWT);

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecret()),
    );

    if (!payload?.email) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Token Error",
      });
    }

    return db.user.findUnique({
      where: { email: payload.email as string},
      select: {
        id: true,
        name: true,
        email: true,
        verified: true,
      },
    });
  } catch (error) {
    return null;
  }
};
