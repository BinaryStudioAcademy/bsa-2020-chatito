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
      privat: false
    },
    {
      chanelname: 'Second Chanel',
      privat: false
    },
    {
      chanelname: 'Third Chanel',
      privat: false
    },
    {
      chanelname: 'Fourth Chanel',
      privat: true
    },
    {
      chanelname: 'Fifth Chanel',
      privat: false
    },
    {
      chanelname: 'Sixth Chanel',
      privat: true
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
