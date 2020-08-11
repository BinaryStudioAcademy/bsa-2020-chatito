import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from 'common/helpers/historyHelper';
import { reducer as toastrReducer } from 'react-redux-toastr';
import workspace from 'scenes/Workspace/reducers';
import user from './user';
import modal from './modal';
import channel from './channel';
import errorBoundary from './errorBoundary';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  user,
  workspace,
  modal,
  errorBoundary,
  channel,
  toastr: toastrReducer
});

export default rootReducer;
