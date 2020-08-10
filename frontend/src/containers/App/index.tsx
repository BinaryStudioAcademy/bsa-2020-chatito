import React from 'react';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import { ConnectedRouter } from 'connected-react-router';
import Routing from '../Routing';
import ErrorBoundary from '../ErrorBoundary';
import Post from '../../components/Post';
import { store } from '../../store';
import { IUser } from '../../common/models/user/IUser';
import { history } from '../../common/helpers/historyHelper';

const testUser: Partial<IUser> = {
  fullName: 'Jhonn Smitt',
  imageUrl: 'https://my.throtl.com/assets/icons/user-default-gray'
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

// const App = () => (
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <ErrorBoundary>
//         <Routing />
//         <ReduxToastr
//           timeOut={3000}
//           position="bottom-right"
//           transitionIn="fadeIn"
//           transitionOut="fadeOut"
//         />
//       </ErrorBoundary>
//     </ConnectedRouter>
//   </Provider>
// );

export default App;
