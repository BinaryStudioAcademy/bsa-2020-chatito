import api from '../common/helpers/apiHelper';
import { IUser } from 'common/models/user/IUser';
import { IForgotPasswordInput } from 'common/models/auth/IForgotPasswordInput';

export interface IEditStatusData {
  [key: string]: string;
}
type ServerResponse = string;

export async function editStatus(editStatusData: IEditStatusData) {
  // const response = await api.put<ServerResponse>('/edit-status', { editStatusData });
  const response = editStatusData.status; // mocked
  return response;
}

export async function deleteUser() {
  await api.delete('/api/users/');
}

export async function editUser(data: IUser) {
  const response = await api.put<IUser>('/api/users/', { data });
  return response;
}

export async function forgotPassword(forgotpassword: IForgotPasswordInput) {
  await api.put('/api/auth/forgotpass', { forgotpassword });
}

export async function resetPassword(password: string) {
  await api.put('/api/auth/resetpass', { password });
}
