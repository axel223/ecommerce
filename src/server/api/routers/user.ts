import { z } from "zod";
import jwt from "jsonwebtoken";
import {
  authProcedure,
  createTRPCRouter,
  unAuthProcedure,
} from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";

import { db } from "~/server/db";
import { decrypt, encrypt } from "~/server/crypto";
import { JWT_KEY, maxAge } from "~/utils/constant";
import { Cookies } from "~/server/cookies";
import * as process from "process";

export const authRouter = createTRPCRouter({
  register: unAuthProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .query(async ({ input, ctx }) => {
      const { name, email, password } = input;
      const user = await db.user.findUnique({ where: { email } });

      if (!!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid username",
        });
      }

      const newUser = await db.user.create({
        data: { email, name, password: encrypt(password) },
      });

      return { userId: newUser.id };
    }),
  login: unAuthProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const user = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        console.error("USER NOT FOUND ", email);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `User not found. EMAIL: ${email}`,
        });
      }

      if (decrypt(user.password) !== password) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Invalid email or password.",
        });
      }

      const jwtToken = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET ?? "",
        {
          expiresIn: maxAge,
        },
      );

      Cookies.set(ctx.resHeaders, JWT_KEY, jwtToken, {
        maxAge,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      return { userId: user.id };
    }),
  logout: authProcedure.mutation(async ({ input, ctx }) => {
    Cookies.delete(ctx.resHeaders, JWT_KEY, {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  }),
  addCategory: authProcedure
    .input(
      z.object({
        categoryId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { categoryId } = input;
      const { userId } = ctx;
      const updatedUser = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          categories: {
            connect: {
              id: parseInt(categoryId),
            },
          },
        },
      });

      return { userId: updatedUser.id };
    }),
});
