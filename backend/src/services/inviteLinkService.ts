import { ISendInviteLink } from '../common/models/inviteLink/ISendInviteLink';
import { sendInviteLinkMail } from './mailService';
import { createInviteToken } from '../common/utils/tokenHelper';

export const sendInviteLink = async ({ email, workspaceId }: ISendInviteLink) => {
  const inviteLinkToken = createInviteToken({ email, workspaceId });

  await sendInviteLinkMail({ to: email, token: inviteLinkToken });

  return true;
};
