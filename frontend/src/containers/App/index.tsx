import React from 'react';
import Routing from '../Routing';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import ErrorBoundary from '../ErrorBoundary';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ErrorBoundary>
        <Routing />
      </ErrorBoundary>
    </ConnectedRouter>
  </Provider>
);

export default App;
