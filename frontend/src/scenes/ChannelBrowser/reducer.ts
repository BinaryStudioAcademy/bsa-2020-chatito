import { Routine } from 'redux-saga-routines';
import { fetchBrowserChannelsRoutine } from './routines';

export interface IChannelBrowserState {
  loading: boolean;
  channels: any;
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
    default:
      return state;
  }
};

export default reducer;
