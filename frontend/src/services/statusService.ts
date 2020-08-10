// import api from '../common/helpers/apiHelper';

export interface IEditStatusData {
  [key: string]: string;
}

type ServerResponse = string;

export async function editStatus(editStatusData: IEditStatusData) {
  // const response = await api.put<ServerResponse>('/edit-status', { editStatusData });
  const response = editStatusData.status; // mocked
  return response;
}
