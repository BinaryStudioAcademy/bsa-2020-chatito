import api from '../common/helpers/apiHelper';
import { ISendInviteLink } from '../common/models/inviteLink/ISendInviteLink';
import { ICheckInvitedUserRegistered } from '../common/models/inviteLink/ICheckInvitedUserRegistered';
import { IAddInviteWorkspace } from 'common/models/inviteLink/IAddInviteWorkspace';

export const sendInviteLink = async ({ email, workspaceId }: ISendInviteLink) => {
  const response = await api.post(`/api/workspaces/${workspaceId}/invite`, { email });
  return response;
};

export const checkInvitedUserRegistered = async (payload: ICheckInvitedUserRegistered) => {
  const response = await api.post('/api/users/invite', payload);
  return response;
};

export const addUserToWorkspace = async (payload: IAddInviteWorkspace) => {
  const response = await api.post('/api/users/add-to-workspace', payload);
  return response;
};
