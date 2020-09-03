import { Routine } from 'redux-saga-routines';
import { fetchBrowserChannelsRoutine, joinChannelRoutine, leaveChannelRoutine } from './routines';
import { IBrowserChannel } from 'common/models/chat/IBrowserChannel';

export interface IChannelBrowserState {
  loading: boolean;
  channels: IBrowserChannel[];
  btnLoading: boolean;
}

const initialState: IChannelBrowserState = {
  loading: false,
  channels: [],
  btnLoading: false
};

const reducer = (state: IChannelBrowserState = initialState, { type, payload }: Routine<any>): IChannelBrowserState => {
  switch (type) {
    case fetchBrowserChannelsRoutine.TRIGGER:
      return {
        ...state,
        loading: true
      };
    case fetchBrowserChannelsRoutine.SUCCESS:
      return {
        ...state,
        loading: false,
        channels: payload
      };
    case fetchBrowserChannelsRoutine.FAILURE:
      return {
        ...state,
        loading: false
      };
    case joinChannelRoutine.TRIGGER:
      return {
        ...state,
        btnLoading: true
      };
    case joinChannelRoutine.SUCCESS: {
      const { chatId, userId } = payload;
      return {
        ...state,
        channels: state.channels.map(channel => {
          if (channel.id === chatId) {
            return { ...channel, users: [...channel.users, { id: userId }] };
          }
          return channel;
        }),
        btnLoading: false
      };
    }
    case joinChannelRoutine.FAILURE:
      return {
        ...state,
        btnLoading: false
      };
    case leaveChannelRoutine.TRIGGER:
      return {
        ...state,
        btnLoading: true
      };
    case leaveChannelRoutine.SUCCESS: {
      const { chatId, userId } = payload;
      return {
        ...state,
        channels: state.channels.map(channel => {
          if (channel.id === chatId) {
            return { ...channel, users: channel.users.filter(user => user.id !== userId) };
          }
          return channel;
        }),
        btnLoading: false
      };
    }
    case leaveChannelRoutine.FAILURE:
      return {
        ...state,
        btnLoading: false
      };
    default:
      return state;
  }
};

export default reducer;
