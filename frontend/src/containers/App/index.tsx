import React from 'react';
import Routing from '../Routing';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { history } from '../../common/helpers/historyHelper';
import { store } from '../../store';

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Routing />
    </Router>
  </Provider>
);

export default App;
