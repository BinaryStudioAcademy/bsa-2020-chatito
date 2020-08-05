import React from 'react';
import Routing from '../Routing';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
<<<<<<< HEAD
import Workspace from '../../scenes/Workspace/Workspace';
=======
>>>>>>> 1fc1b5b46c4fea535c8965dd3fde0deb2b244ff1

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
<<<<<<< HEAD
      <Workspace />
=======
      <Routing />
>>>>>>> 1fc1b5b46c4fea535c8965dd3fde0deb2b244ff1
    </ConnectedRouter>
  </Provider>
);

export default App;
