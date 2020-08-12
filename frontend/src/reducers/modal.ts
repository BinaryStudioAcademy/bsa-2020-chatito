import { Routine } from 'redux-saga-routines';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';

export interface IModalState {
  editProfile: boolean;
  createChannel: boolean;
  createDirect: boolean;
}

const initialState: IModalState = {
  editProfile: false,
  createChannel: false,
  createDirect: false
};

export default (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case showModalRoutine.TRIGGER: {
      const { modalType, show } = action.payload;
      switch (modalType) {
        case ModalTypes.EditProfile: {
          return { ...state, editProfile: show };
        }
        case ModalTypes.CreateChannel: {
          return { ...state, createChannel: show };
        }
        case ModalTypes.CreateDirect: {
          return { ...state, createDirect: show };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
