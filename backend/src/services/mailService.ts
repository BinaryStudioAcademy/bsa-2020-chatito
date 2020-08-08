import sgMail from '@sendgrid/mail';
import { env } from '../env';
import { IMessage } from '../common/models/sendgrid/IMessage';
import { IResetPasswordMessage } from '../common/models/sendgrid/IResetPasswordMessage';

const { mail, client } = env.app;

export const sendMail = async ({ from = mail, to, subject, text }: IMessage) => {
  const message = { from, to, subject, text };
  await sgMail.send(message);
};

export const sendResetPasswordMail = async ({ to, token }: IResetPasswordMessage) => {
  const message = {
    to,
    subject: 'Password reset instructions',
    text: `Please use the following link to reset your password: ${client}/resetpassword/${token}`
  };

  await sendMail(message);
};
