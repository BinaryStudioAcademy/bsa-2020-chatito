import jwt from 'jsonwebtoken';
import { secret, expiresIn } from '../config/inviteLinkConfig';

import { ISendInviteLink } from '../common/models/inviteLink/ISendInviteLink';
import { sendInviteLinkMail } from './mailService';

export const sendInviteLink = async ({ email, workspaceId }: ISendInviteLink) => {
  const inviteLinkToken = jwt.sign({ email, workspaceId }, secret, { expiresIn });

  await sendInviteLinkMail({ to: email, token: inviteLinkToken });

  return true;
};
