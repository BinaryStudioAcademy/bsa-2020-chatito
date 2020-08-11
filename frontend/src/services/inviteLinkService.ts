import api from '../common/helpers/apiHelper';
import { ISendInviteLink } from '../common/models/inviteLink/ISendInviteLink';
import { ICheckInvitedUserRegistered } from '../common/models/inviteLink/ICheckInvitedUserRegistered';
import { IInvitedUserRegisteredResponse } from '../common/models/inviteLink/IInvitedUserRegisteredResponse';

// eslint-disable-next-line
export const sendInviteLink = async (payload: ISendInviteLink) => {
  // const response = await api.post('/api/workspaces/:id/invite', payload);
  // return response;
  return true;
};

// eslint-disable-next-line
export const checkInvitedUserRegistered = async (payload: ICheckInvitedUserRegistered): Promise<IInvitedUserRegisteredResponse> => {
  // const response =  await api.post('/api/users/invite, payload);
  // return response
  return {
    invitedUserEmail: 'test@gmail.com',
    workspace: {
      id: '12345',
      name: 'blablabla',
      imageUrl: '',
      hash: ''
    }
  };
};
