import nodemailer from "nodemailer";
import { TRPCError } from "@trpc/server";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
) => {
  const { MAIL_ID, MAIL_PASS } = process.env;
  if (!MAIL_ID || !MAIL_PASS) {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
      message: "Environment Variable not setup",
    });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAIL_ID,
      pass: MAIL_PASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: MAIL_ID,
      to: to,
      subject: subject,
      text: text,
      html: html || "",
    });
    console.log("Message sent: %s", info.messageId);
  } catch (err) {
    console.log(err);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Message not sent",
    });
  }

  return {
    success: true,
  };
};
