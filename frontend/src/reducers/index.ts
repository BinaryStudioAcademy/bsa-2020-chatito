import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../common/helpers/historyHelper';
import UserReducer from './user';
import WorkspaceReducer from '../scenes/Workspace/reducer';
import user from './user';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  user,
  WorkspaceReducer
});

export default rootReducer;
