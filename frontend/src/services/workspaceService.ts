import api from '../common/helpers/apiHelper'

export async function addWorkspace(name: string) {
  // const response = await makeRequest('https://',{
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json;charset=utf-8'},
  //     body: JSON.stringify(name)
  //   });
  const response = await api.post('https://', {name})
  return await response
}