import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { history } from '../common/helpers/historyHelper';
import UserReducer from './user';

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  UserReducer
});

export default rootReducer;
