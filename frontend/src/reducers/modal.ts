import { Routine } from 'redux-saga-routines';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';

export interface IModalState {
  editProfile: boolean;
  createChannel: boolean;
  createDirect: boolean;
  invitePopup: boolean;
  inviteChat: boolean;
  chatMembers: boolean;
}

const initialState: IModalState = {
  editProfile: false,
  createChannel: false,
  createDirect: false,
  invitePopup: false,
  inviteChat: false,
  chatMembers: false
};

export default (state = initialState, action: Routine<any>) => {
  switch (action.type) {
    case showModalRoutine.TRIGGER: {
      const { modalType, show } = action.payload;
      const stateToSet: {[key: string]: boolean} = { ...state };
      const stateKeys = Object.keys(state);
      stateKeys.forEach((element: string) => {
        if (element) {
          stateToSet[element] = false;
        }
      });
      switch (modalType) {
        case ModalTypes.EditProfile: {
          return { ...stateToSet, editProfile: show };
        }
        case ModalTypes.CreateChannel: {
          return { ...stateToSet, createChannel: show };
        }
        case ModalTypes.CreateDirect: {
          return { ...stateToSet, createDirect: show };
        }
        case ModalTypes.InvitePopup: {
          return { ...stateToSet, invitePopup: show };
        }
        case ModalTypes.InviteChat: {
          return { ...state, inviteChat: show };
        }
        case ModalTypes.ChatMembers: {
          return { ...stateToSet, chatMembers: show };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
