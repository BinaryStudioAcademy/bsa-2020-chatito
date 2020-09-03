import { Routine } from 'redux-saga-routines';
import { showModalRoutine } from 'routines/modal';
import { ModalTypes } from 'common/enums/ModalTypes';

export interface IModalState {
  editProfile: boolean;
  createChannel: boolean;
  preferences: boolean;
  createDirect: boolean;
  createRepositoryChat: boolean;
  createWebhookInstructions: boolean;
  invitePopup: boolean;
  inviteChat: boolean;
  chatMembers: boolean;
  setReminder: boolean;
  changeStatus: boolean;
}

const initialState: IModalState = {
  editProfile: false,
  preferences: false,
  createChannel: false,
  createDirect: false,
  createRepositoryChat: false,
  createWebhookInstructions: false,
  invitePopup: false,
  chatMembers: false,
  setReminder: false,
  inviteChat: false,
  changeStatus: false
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
        case ModalTypes.CreateRepositoryChat: {
          return { ...state, createRepositoryChat: show };
        }
        case ModalTypes.CreateWebhookInstructions: {
          return { ...state, createWebhookInstructions: show };
        }
        case ModalTypes.InvitePopup: {
          return { ...state, invitePopup: show };
        }
        case ModalTypes.InviteChat: {
          return { ...state, inviteChat: show };
        }
        case ModalTypes.ChatMembers: {
          return { ...state, chatMembers: show };
        }
        case ModalTypes.SetReminder: {
          return { ...state, setReminder: show };
        }
        case ModalTypes.Preferences: {
          return { ...state, preferences: show };
        }
        case ModalTypes.ChangeStatus: {
          return { ...state, changeStatus: show };
        }
        default:
          return state;
      }
    }
    default:
      return state;
  }
};
