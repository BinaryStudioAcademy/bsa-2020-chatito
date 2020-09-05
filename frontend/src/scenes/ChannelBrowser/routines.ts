import { createRoutine } from 'redux-saga-routines';

export const fetchBrowserChannelsRoutine = createRoutine('FETCH_BROWSER_CHANNELS');
export const joinChannelFromBrowserRoutine = createRoutine('JOIN_CHANNEL_ROUTINE_FROM_BROWSER');
export const leaveChannelFromBrowserRoutine = createRoutine('LEAVE_CHANNEL_ROUTINE_FROM_BROWSER');
