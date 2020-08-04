import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import Workspace from '../../scenes/Workspace/Workspace';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Workspace />
    </ConnectedRouter>
  </Provider>
);

export default App;
