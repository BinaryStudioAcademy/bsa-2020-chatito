import nodemailer from 'nodemailer';
import { env } from '../env';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.mail.mail,
    pass: env.mail.password
  }
});
