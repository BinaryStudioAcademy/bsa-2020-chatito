import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from 'common/helpers/historyHelper';
import { reducer as toastrReducer } from 'react-redux-toastr';
import workspace from 'scenes/Workspace/reducers';
import chat from 'scenes/Chat/reducers';
import user from './user';
import modal from './modal';
import errorBoundary from './errorBoundary';
import threadsReducer from 'containers/ThreadsContainer/reducers/reducer';
import drafts from 'scenes/Drafts/reducer';
import joinInvitedWorkspaceReducer from 'containers/JoinInvitedWorkspace/reducer';
import channelBrowser from 'scenes/ChannelBrowser/reducer';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  user,
  workspace,
  chat,
  modal,
  errorBoundary,
  toastr: toastrReducer,
  threads: threadsReducer,
  drafts,
  inviteWorkspace: joinInvitedWorkspaceReducer,
  channelBrowser
});

export default rootReducer;
