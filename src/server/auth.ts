import jwt from "jsonwebtoken";
import { JWT_KEY } from "~/utils/constant";
import { db } from "./db";
import { Cookies } from "./cookies";
import { type NextApiRequest } from "next";

export type IUserInfo = {
  id: string;
  name: string;
} | null;

export const getUserInfo = async (request: NextApiRequest) => {
  const token = Cookies.get(request, JWT_KEY);

  if (!token) return null;

  try {
    const { userId } = jwt.verify(
      token,
      process.env.JWT_SECRET ?? "",
    ) as unknown as {
      userId: string;
    };

    const user = await db.user.findUnique({
      where: { id: parseInt(userId) },
      select: {
        id: true,
        name: true,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
