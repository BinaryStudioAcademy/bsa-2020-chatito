import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import SignIn from '../../scenes/SignIn/index';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <SignIn />
    </ConnectedRouter>
  </Provider>
);

export default App;
