import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '@helpers/historyHelper';
import { reducer as toastrReducer } from 'react-redux-toastr';
import workspace from '../scenes/Workspace/reducers/reducer';
import user from './user';
import modal from './modal';
import errorBoundary from './errorBoundary';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  user,
  workspace,
  modal,
  errorBoundary,
  toastr: toastrReducer
});

export default rootReducer;
