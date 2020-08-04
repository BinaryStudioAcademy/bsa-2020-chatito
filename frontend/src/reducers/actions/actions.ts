import { ADD_WORKSPACE } from './actionTypes';

export default function addWorkspace(name: string) {
  return {
    type: ADD_WORKSPACE,
    payload: name
  };
}
