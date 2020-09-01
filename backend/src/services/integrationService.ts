import axios from 'axios';

export const createWhaleMeeting = async (email: string) => {
  try {
    const response = await axios
      .post('http://bsa2020-whale.westeurope.cloudapp.azure.com:4201/api/external/startMeeting', { email }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    console.log('Returned data:', response);
  } catch (e) {
    console.log(`Axios request failed: ${e}`);
  }
  // return chatUsers.map(user => fromUserToUserClient(user));
};
