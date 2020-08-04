import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import rootSaga from '../sagas/index';
import reducers from './reducers';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  routerMiddleware(history),
  sagaMiddleware
];

const composedEnhancers = compose(
  applyMiddleware(...middlewares)
);

const initialState = {};

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers
});

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

// export const sagaAction = (data) => store.dispatch(data);

sagaMiddleware.run(rootSaga);
