import api from '../common/helpers/apiHelper';

export const login = async (userData: string) => {
  const response: Response = await api.post('/api/auth/login', {userData});

  return response.json();
};


export const registration = async (userData: string) => {
  const response: Response = await api.post('/api/auth/register', {userData});
  return response.json();
};
