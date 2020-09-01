import { env } from '../env';
import { transporter } from '../config/nodeMailer';
import { IMessage } from '../common/models/sendgrid/IMessage';
import { IResetPasswordMessage } from '../common/models/sendgrid/IResetPasswordMessage';
import { IInviteLinkMessage } from '../common/models/sendgrid/IInviteLinkMessage';

const { client } = env.app;
const { mail } = env.mail;

export const sendMail = async ({ from = mail, html = '', to, subject, text }: IMessage) => {
  const mailOptions = {
    from,
    to,
    subject,
    text,
    html
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error: Error, info: any) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export const sendResetPasswordMail = async ({ to, token }: IResetPasswordMessage) => {
  const message = {
    to,
    subject: 'Password reset instructions',
    text: `Please use the following link to reset your password: ${client}/auth/reset/${token}`
  };
  await sendMail(message);
};

export const sendInviteLinkMail = async ({ to, token }: IInviteLinkMessage) => {
  const message = {
    to,
    subject: 'Join workspace in Chatito!',
    text: `Hi, buddy! You are invited to join the workspace in Chatito.
          Follow the link and quickly join us: ${client}/invite/${token}`
  };
  await sendMail(message);
};
