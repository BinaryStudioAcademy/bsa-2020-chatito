import sgMail from '@sendgrid/mail';
import { env } from '../env';

sgMail.setApiKey(env.app.sendgrid);
