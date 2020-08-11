import api from '../common/helpers/apiHelper';
import { ISendInviteLink } from '../common/models/inviteLink/ISendInviteLink';
import { ICheckInvitedUserRegistered } from '../common/models/inviteLink/ICheckInvitedUserRegistered';

// eslint-disable-next-line
export const sendInviteLink = async (payload: ISendInviteLink) => {
  // const response = await api.post('/api/workspaces/:id/invite', payload);
  // return response;
  return true;
};

// eslint-disable-next-line
export const checkInvitedUserRegistered = async (payload: ICheckInvitedUserRegistered) => {
  // const response =  await api.post('/api/users/isRegistered, payload);
  // return response
  return true;
};
