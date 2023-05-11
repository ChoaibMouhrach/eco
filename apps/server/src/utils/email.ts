import { config } from '../config/config';
import nodemailer from 'nodemailer';
import ejs from 'ejs';
import { join } from 'path';
import { readFileSync } from 'fs';

/* Setup the smtp credentials */
const smtp = {
  host: config.SMTP_HOST,
  port: Number(config.SMTP_PORT),
  auth: {
    user: config.SMTP_USER,
    pass: config.SMTP_PASS,
  },
};

/* creating an instance of the transporter */
const transporter = nodemailer.createTransport(smtp);

/**
 * Sends An email with the proper email template
 */
export const sendMail = async ({
  to,
  subject,
  template,
}: {
  to: string;
  subject: string;
  template: {
    path: string;
    data?: Record<string, string | number | undefined>;
  };
}) => {
  return await transporter.sendMail({
    from: `'${config.NAME}' ${config.SMTP_FROM_ADDRESS}`,
    to,
    subject,
    html: ejs.compile(
      readFileSync(join(config.ROOT_DIR, 'templates/emails', template.path), 'utf8'),
    )(template.data),
  });
};
