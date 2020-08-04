import { combineReducers, Action } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import UserReducer from './usersReducer';

export interface actionIS extends Action {
  type: string;
}

export const history = createBrowserHistory();

const rootReducer = () => combineReducers({
  router: connectRouter(history),
  UserReducer
});

export default rootReducer;
