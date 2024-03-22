import nodemailer from "nodemailer";
import { TRPCError } from "@trpc/server";

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html: string,
) => {
  const { MAILID, MAILPASS } = process.env;
  if (!MAILID || MAILPASS) {
    throw new TRPCError({
      code: "NOT_IMPLEMENTED",
      message: "Environment Variable not setup",
    });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: MAILID,
      pass: MAILPASS,
    },
  });

  try {
    const info = await transporter.sendMail({
      from: MAILID,
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
