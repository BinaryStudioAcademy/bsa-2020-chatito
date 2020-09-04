import axios from 'axios';

export const createWhaleMeeting = async (email: string) => {
  const response = await axios
    .post('https://bsa2020-whale.westeurope.cloudapp.azure.com/api/external/startMeeting', { email }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  return response.data;
};
