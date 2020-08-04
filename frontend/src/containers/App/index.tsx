import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import Header from '../Header';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Header />
      <span>Welcome to Chatito!</span>
    </ConnectedRouter>
  </Provider>
);

export default App;
