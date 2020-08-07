import React from 'react';
import Routing from '../Routing';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import Post from '../../components/Post';
import { IUser } from '../../common/models/user';

const testUser: IUser = {
  fullname: 'Jhonn Smitt',
  imgUrl: 'https://img.favpng.com/25/13/19/samsung-galaxy-a8-a8-user-login-telephone-avatar-png-favpng-dqKEPfX7hPbc6SMVUCteANKwj.jpg', // eslint-disable-line max-len
  isOnline: true
};

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Post
        user={testUser}
        text="Chatito is a collaboration web platform that allows users to communicate in real-time using easily accessible web interfaces." // eslint-disable-line max-len
        sendedAt={new Date()}
      />
    </ConnectedRouter>
  </Provider>
);

export default App;
