import React from 'react';
import {render} from 'react-dom';
import App from './Components/App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { createStore,combineReducers,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { composeWithDevTools } from 'redux-devtools-extension';

import thunkMiddleware from 'redux-thunk';

import inouts from './reducers/inouts';
import selectedElement from './reducers/selectedElement';
import visibilityFilter from './reducers/visibilityFilter';
import todos from './reducers/todos'

const showChecklist = (state = false, action) => {
  if(action.type === 'TOGGLE_CHECKLIST') {
    return !state
  }
  return state;
}

const reducers = combineReducers({
  inouts,
  selected: selectedElement,
  visibilityFilter,
  showChecklist,
  todos
});

let store = createStore(
  reducers,
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
