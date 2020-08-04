import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../common/helpers/historyHelper';
import UserReducer from './user';
import workspaceReducer from './workspaceReducer';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  UserReducer,
  workspaceReducer
});

export default rootReducer;
