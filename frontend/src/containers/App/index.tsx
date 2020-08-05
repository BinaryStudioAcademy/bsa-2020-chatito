import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import Header from '../Header';
import TextEditor from '../../components/TextEditor';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Header />
      <span>Welcome to Chatito!</span>

      <TextEditor
        placeholder="Type here.."
        height={200}
        width={600}
        onSend={() => console.log('SEND')}
      />

    </ConnectedRouter>
  </Provider>
);

export default App;
