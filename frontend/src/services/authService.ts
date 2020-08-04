import callWebApi from '../helpers/webApiHelper';

export const login = async (request: string) => {
  const response = await callWebApi({
    endpoint: '/api/auth/login',
    type: 'POST',
    request
  });
  return response.json();
};

export const registration = async (request: string) => {
  const response = await callWebApi({
    endpoint: '/api/auth/register',
    type: 'POST',
    request
  });
  return response.json();
};
