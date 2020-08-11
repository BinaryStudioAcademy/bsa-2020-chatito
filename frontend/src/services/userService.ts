import api from '../common/helpers/apiHelper';
import { IUser } from 'common/models/user/IUser'
import { IForgotPasswordInput } from 'common/models/auth/IForgotPasswordInput';
import { IEditStatusData } from 'common/models/status/IEditStatusData';

export const editStatus = async (editStatusData: IEditStatusData) => {
  const response = await api.put<string>('/edit-status', { editStatusData });
  return response;
}

export const deleteUser = async () => {
  await api.delete('/api/users');
}

export const editUser = async (data: IUser) => {
  const response = await api.put<IUser>('/api/users', { data });
  return response;
}

export const forgotPassword = async (forgotpassword: IForgotPasswordInput) => {
  await api.put('/api/auth/forgotpass', { forgotpassword });
}

export const resetPassword = async (password: string) => {
  await api.put('/api/auth/resetpass', { password });
}
