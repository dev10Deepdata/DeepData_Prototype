import { all, fork } from 'redux-saga/effects';
import { backURL } from '../config/config';
import axios from 'axios';
import dataSaga from './data';
import mapControl from './mapControl';

// axios.defaults.baseURL = backURL;
// axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(dataSaga)]);
  yield all([fork(mapControl)]);
}
