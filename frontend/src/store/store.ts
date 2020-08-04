import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import rootReducer, { history } from '../reducers/root';

declare global {
  interface Window { // eslint-disable-line
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose; // eslint-disable-line
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  rootReducer(),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);

sagaMiddleware.run(rootSaga);
