import api from '../common/helpers/apiHelper';
import { ISendInviteLink } from '../common/models/inviteLink/ISendInviteLink';
import { ErrorMessage } from 'formik';

// eslint-disable-next-line
export const sendInviteLink = async (payload: ISendInviteLink) => {
  // const response = await api.post('/api/invite', payload);
  // return response;
  return true;
};
