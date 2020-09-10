import { Routine } from 'redux-saga-routines';
import { fetchBrowserChannelsRoutine, joinChannelFromBrowserRoutine, leaveChannelFromBrowserRoutine } from './routines';
import { IBrowserChannel } from 'common/models/chat/IBrowserChannel';

export interface IChannelBrowserState {
  loading: boolean;
  channels: IBrowserChannel[];
}

const initialState: IChannelBrowserState = {
  loading: false,
  channels: []
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
    case joinChannelFromBrowserRoutine.SUCCESS: {
      const { chatId, userId } = payload;
      return {
        ...state,
        channels: state.channels.map(channel => {
          if (channel.id === chatId) {
            return { ...channel, users: [...channel.users, { id: userId }] };
          }
          return channel;
        })
      };
    }
    case leaveChannelFromBrowserRoutine.SUCCESS: {
      const { chatId, userId } = payload;
      return {
        ...state,
        channels: state.channels.map(channel => {
          if (channel.id === chatId) {
            return { ...channel, users: channel.users.filter(user => user.id !== userId) };
          }
          return channel;
        })
      };
    }
    default:
      return state;
  }
};

export default reducer;
