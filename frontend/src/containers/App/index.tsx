import React from 'react';
import Routing from '../Routing';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import TextEditor from '../../components/TextEditor';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <TextEditor placeholder="" height={300} onSend={() => console.log('dsA')} />
      {/* <Routing /> */}
    </ConnectedRouter>
  </Provider>
);

export default App;
