import api from '../common/helpers/apiHelper'

export async function addWorkspace(name: string) {
  const response = await api.post('https://', {name})
  return response
}