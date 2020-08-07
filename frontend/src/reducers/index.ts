import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../common/helpers/historyHelper';
import workspace from '../scenes/Workspace/reducers/reducer';
import user from './user';
import modal from './modal';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  user,
  workspace,
  modal
});

export default rootReducer;
