'use server'

import { signIn } from "@/auth"
import { info } from "console"
import nodemailer from "nodemailer"
import { env } from "process"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '5555', 10) |,
  secure: !!(parseInt(process.env.SMTP_PORT || '5555', 10) == 465),
  auth: {
    user: process.env.SMTP_USER || 'user',
    pass: process.env.SMTP_PASS || 'pass',
  }
})

export default async function SendEmail(data: EmailTemplateProps) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    ...data
  }, (error, info) => {
    if (error) {
      console.log("Error");
      return false;
    }
    console.log("Send email ", info.messageId);
  });
}