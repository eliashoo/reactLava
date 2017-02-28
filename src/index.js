import React from 'react';
import {render} from 'react-dom';
import App from './Components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ApiService from './utils/ApiService';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer';

const apiService = new ApiService("https://stage-8195.restdb.io/rest/stages");

let store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({apiService})
    )
  )
);


render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
