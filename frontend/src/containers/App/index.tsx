import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

const App = () => (
  <div>
    <Provider store={store}>
      <span>Welcome to Chatito!</span>
    </Provider>
  </div>
);

export default App;
