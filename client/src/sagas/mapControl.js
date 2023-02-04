import { all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  SET_POSITION_FAILURE,
  SET_POSITION_REQUEST,
  SET_POSITION_SUCCESS,
} from '../reducers/mapControl';

// function setPositionAPI(data) {
//   return axios.get(`post/${data}`);
// }

function* setPosition(action) {
  try {
    // const result = yield call(setPositionAPI, action.data);
    yield delay(500);
    yield put({
      type: SET_POSITION_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SET_POSITION_FAILURE,
      error: err.response.data,
    });
  }
}

// Event Listener와 비슷한 역할
function* watchSetPosition() {
  yield takeLatest(SET_POSITION_REQUEST, setPosition);
}

export default function* dataSaga() {
  yield all([fork(watchSetPosition)]);
}
