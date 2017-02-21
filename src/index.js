import React from 'react';
import {render} from 'react-dom';
import App from './Components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

let store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunkMiddleware
    )
  )
);


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
