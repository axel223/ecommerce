import { z } from "zod";
import {
  authProcedure,
  createTRPCRouter,
  tempAuthProcedure,
  unAuthProcedure,
} from "~/server/api/trpc";

import { TRPCError } from "@trpc/server";

import { db } from "~/server/db";
import { decrypt, encrypt } from "~/server/crypto";
import { EMAIL_JWT, JWT_KEY, maxAge, OTP_KEY } from "~/utils/constant";
import { Cookies } from "~/server/cookies";
import * as process from "process";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import otpGenerator from "otp-generator";
import { getJwtSecret } from "~/lib/auth";
import { sendEmail } from "~/utils/email";

export const userRouter = createTRPCRouter({
  register: unAuthProcedure
    .input(
      z.object({
        name: z.string().min(3).max(20),
        email: z.string().email(),
        password: z.string().min(3).max(20),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;
      const { res } = ctx;
      const user = await db.user.findUnique({ where: { email } });

      if (!!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid email",
        });
      }

      const newUser = await db.user.create({
        data: { email, name, password: encrypt(password) },
      });

      if (!newUser) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "server Error",
        });
      }

      const jwtToken = await new SignJWT({ email })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("30 min")
        .sign(new TextEncoder().encode(getJwtSecret()));

      Cookies.set(res, EMAIL_JWT, jwtToken, {
        maxAge,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      return { userId: newUser.id };
    }),
  generateOtp: tempAuthProcedure.mutation(async ({ input, ctx }) => {
    const { userInfoByEmail, res } = ctx;
    if (!userInfoByEmail) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "invalid username",
      });
    }

    const { id: userId, name: userName, email } = userInfoByEmail;
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "invalid username",
      });
    }

    if (user.verified) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Already verified",
      });
    }

    const otp = otpGenerator.generate(8, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    await sendEmail(
      email,
      "Please verify your email",
      `Hey ${userName},\n\nYour registration is completed successfully.\n\nYour email verification OTP is ${otp}\n\nThanks`,
      "",
    );

    Cookies.set(res, OTP_KEY, encrypt(otp), {
      maxAge,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });

    return { userId: user.id };
  }),
  verifyOtp: tempAuthProcedure
    .input(z.object({ otp: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { otp } = input;
      const { userInfoByEmail, req } = ctx;
      if (!userInfoByEmail) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid username",
        });
      }

      const encryptedOtp = Cookies.get(req, OTP_KEY);
      console.log("otp", decrypt(encryptedOtp ?? ""), otp);

      if (decrypt(encryptedOtp ?? "") !== otp) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid OTP",
        });
      }
      const { id: userId } = userInfoByEmail;
      const updatedUser = await db.user.update({
        where: {
          id: userId,
        },
        data: {
          verified: true,
        },
      });
      return { userId: updatedUser.id };
    }),
  login: unAuthProcedure
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;
      const { res } = ctx;

      const user = await db.user.findUnique({
        where: {
          email: email,
          verified: true,
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

      const jwtToken = await new SignJWT({ userId: user.id })
        .setProtectedHeader({ alg: "HS256" })
        .setJti(nanoid())
        .setIssuedAt()
        .setExpirationTime("1 day")
        .sign(new TextEncoder().encode(getJwtSecret()));

      Cookies.set(res, JWT_KEY, jwtToken, {
        maxAge,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
      });

      return { userId: user.id };
    }),
  logout: authProcedure.mutation(async ({ input, ctx: { res } }) => {
    Cookies.delete(res, JWT_KEY, {
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      sameSite: "lax",
    });
  }),
  getCategory: authProcedure
    .query(async ({ input, ctx }) => {
      const { userId } = ctx;
      const updatedUser = await db.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          categories: true
        }
      });

      if(!updatedUser) {
        return {
          user: null, categories: []
        }
      }
      return { user: updatedUser.id, categories: updatedUser.categories};
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
  removeCategory: authProcedure
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
            disconnect: {
              id: parseInt(categoryId),
            },
          },
        },
      });

      return { userId: updatedUser.id };
    }),
});
