import { Routine } from 'redux-saga-routines';
import { postWorkspaceNameRoutine } from '../Workspace/routines'
interface IWorkspaceState{
  name: string;
  loading: boolean
}

const initialState: IWorkspaceState = {
  name: '',
  loading: false
}

export const workspace = (state: IWorkspaceState = initialState, {type, payload}: Routine<any>) => {

  switch(type) {
    case postWorkspaceNameRoutine.TRIGGER:
      return {
        ...state, name: payload, loading: true
      }
    case postWorkspaceNameRoutine.FAILURE:
      return {
        ...state, loading: false
      }
    case postWorkspaceNameRoutine.SUCCESS:
      return {
        ...state, loading: false
      }
    default:
      return state
  }
}