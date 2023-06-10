import config from "@src/config/config";
import nodemailer from "nodemailer";

export const mailer = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
});
