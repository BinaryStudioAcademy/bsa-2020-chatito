import { Routine } from 'redux-saga-routines';
import { checkInvitedUserRegisteredRoutine } from './routines';

export interface IJoinInvitedWorkspaceState {
  loading: boolean;
}

const initialState: IJoinInvitedWorkspaceState = {
  loading: false
};

const joinInvitedWorkspaceReducer = (
  state: IJoinInvitedWorkspaceState = initialState,
  { type }: Routine<any>
) => {
  switch (type) {
    case checkInvitedUserRegisteredRoutine.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case checkInvitedUserRegisteredRoutine.FAILURE:
    case checkInvitedUserRegisteredRoutine.SUCCESS:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default joinInvitedWorkspaceReducer;
