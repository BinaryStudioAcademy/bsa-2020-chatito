import { createRoutine } from 'redux-saga-routines';

export const fetchBrowserChannelsRoutine = createRoutine('FETCH_BROWSER_CHANNELS');
export const joinChannelRoutine = createRoutine('JOIN_CHANNEL_ROUTINE');
export const leaveChannelRoutine = createRoutine('LEAVE_CHANNEL_ROUTINE');
