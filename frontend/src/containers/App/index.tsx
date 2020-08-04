import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from "../../common/helpers/historyHelper"

const App = () => (
  <Provider store={store}>
      <ConnectedRouter history={history}>
      <span>Welcome to Chatito!</span>
      </ConnectedRouter>
  </Provider>
);

export default App;
