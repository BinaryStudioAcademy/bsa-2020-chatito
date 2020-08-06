import api from '../common/helpers/apiHelper'

export async function addWorkspace(name: string) {
  const response = await api.post('/', { name })
  return response
}

export async function getWorkspaces() {
  const response = await api.get('/')
  return response
}
