import { Routine } from 'redux-saga-routines';
import { postWorkspaceNameRoutine } from '../Workspace/routines'
interface IWorkspaceState{
  name: string
}

const initialState: IWorkspaceState = {
  name: ''
}

export const workspace = (state: IWorkspaceState = initialState, {type, payload}: Routine<any>) => {

  switch(type) {
    case postWorkspaceNameRoutine.TRIGGER:
      return {
        name: payload
      }
    default:
      return state
  }
}