import React from 'react';
import Routing from '../Routing';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { ConnectedRouter } from 'connected-react-router';
import { history } from '../../common/helpers/historyHelper';
import ErrorBoundary from '../ErrorBoundary';
import ReduxToastr from 'react-redux-toastr';

const App = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <ErrorBoundary>
        <Routing />
        <ReduxToastr
          timeOut={3000}
          position="bottom-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </ErrorBoundary>
    </ConnectedRouter>
  </Provider>
);

export default App;
