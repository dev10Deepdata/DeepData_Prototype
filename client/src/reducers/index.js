import { combineReducers } from 'redux';
import data from './data';
import mapControl from './mapControl';

const rootReducer = combineReducers({
  data,
  mapControl,
});
export default rootReducer;
