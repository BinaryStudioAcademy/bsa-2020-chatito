import { ADD_WORKSPACE } from './actions/actionTypes';

const initialState: IInitialState = {
  name: ''
};

interface IInitialState{
  name: string;
}

interface IAction {
  type: string;
  payload: string;
}

export default function workspace(state = initialState, action: IAction) {
  switch (action.type) {
    case ADD_WORKSPACE:
      return {
        name: action.payload
      };
    default:
      return state;
  }
}
