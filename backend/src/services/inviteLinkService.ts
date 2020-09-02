import { getCustomRepository } from 'typeorm';
import { ISendInviteLink } from '../common/models/inviteLink/ISendInviteLink';
import { sendInviteLinkMail } from './mailService';
import { createInviteToken } from '../common/utils/tokenHelper';
import UserRepository from '../data/repositories/userRepository';
import CustomError from '../common/models/CustomError';
import { ErrorCode } from '../common/enums/ErrorCode';

export const sendInviteLink = async ({ email, workspaceId }: ISendInviteLink) => {
  const user = await getCustomRepository(UserRepository).getByEmail(email);
  if (user) {
    const userWorkspaces = user.workspaces.some(workspace => workspace.id === workspaceId);
    if (userWorkspaces) {
      throw new CustomError(409, 'User is already in workspace.', ErrorCode.UserExistsInWorkspace);
    }
  }
  const inviteLinkToken = createInviteToken({ email, workspaceId });

  await sendInviteLinkMail({ to: email, token: inviteLinkToken });

  return true;
};
