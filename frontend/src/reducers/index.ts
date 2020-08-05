import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../common/helpers/historyHelper';
import UserReducer from './user';
import workspace from '../scenes/Workspace/reducer';
import user from './user';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  user,
  workspace
});

export default rootReducer;
