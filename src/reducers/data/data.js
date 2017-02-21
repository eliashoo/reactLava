import {combineReducers} from 'redux';

import todos from './todos';
import currentStage from './currentStage';
import stages from './stages';

const data = combineReducers(
  {
    todos,
    currentStage,
    stages
  }
);

export default data;
