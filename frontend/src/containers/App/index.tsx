import React from 'react';
// import Routing from '../Routing';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';

import LeftSideToolbar from '../LeftsideToolbar';

const defUser = {
  username: 'Tommy Default',
  chanels: [
    {
      chanelname: 'First Chanel',
      private: false
    },
    {
      chanelname: 'Second Chanel',
      private: false
    },
    {
      chanelname: 'Third Chanel',
      private: false
    },
    {
      chanelname: 'Fourth Chanel',
      private: true
    },
    {
      chanelname: 'Fifth Chanel',
      private: false
    },
    {
      chanelname: 'Sixth Chanel',
      private: true
    }
  ],
  links: [
    {
      linkname: 'First Link',
      active: true
    },
    {
      linkname: 'Second Link',
      active: true
    },
    {
      linkname: 'Third Link',
      active: false
    },
    {
      linkname: 'Fourth Link',
      active: false
    },
    {
      linkname: 'Fifth Link',
      active: true
    }
  ]
};

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <LeftSideToolbar user={defUser} />
    </ConnectedRouter>
  </Provider>
);

export default App;
