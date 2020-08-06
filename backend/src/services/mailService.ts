import sgMail from '@sendgrid/mail';
import { env } from '../env';
import { IMessage } from '../common/models/sendgrid/IMessage';

const { mail } = env.app;

export const sendMail = async ({ from = mail, to, subject, text }: IMessage) => {
  const message = { from, to, subject, text };
  await sgMail.send(message);
};
