import { hideEditModal, showEditModal } from './routines';
import { Routine } from 'redux-saga-routines';

export interface IEditProfileState{
  isShown: boolean;
}

const initialState: IEditProfileState = {
  isShown: false
};

export default function (state = initialState, action: Routine<any>) {
  switch (action.type) {
    case hideEditModal.TRIGGER: {
      return { ...state, isShown: false };
    }
    case showEditModal.TRIGGER: {
      return { ...state, isShown: true };
    }
    default:
      return state;
  }
}
