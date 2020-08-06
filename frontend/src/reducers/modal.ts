import { Routine } from 'redux-saga-routines';
import { showModalRoutine } from '../routines/modal';
import { ModalTypes } from '../common/enums/ModalTypes';

export interface IModalState {
  editProfile: boolean;
}

const initialState: IModalState = {
  editProfile: false
};

export default (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case showModalRoutine.TRIGGER: {
      const { modalType, show } = action.payload;
      switch (modalType) {
        case ModalTypes.editProfile: {
          return { ...state, editProfile: show };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
