import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory as createHistory } from 'history';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import reducer from './reducer';
import App from './App';
import SessionManager from './sessions';
import registerServiceWorker from './registerServiceWorker';

function createAppStore() {
  const history = createHistory();
  const sessionManager = new SessionManager('ws://localhost:8080');
  return createStore(reducer, applyMiddleware(thunk.withExtraArgument({
    history,
    sessionManager,
  })));
}

ReactDOM.render((
  <Provider store={createAppStore()}>
    <App />
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
