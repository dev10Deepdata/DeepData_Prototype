import { all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  JOIN_REQUEST,
  JOIN_SUCCESS,
  JOIN_FAILURE,
  SAVE_DATA_REQUEST,
  SAVE_DATA_SUCCESS,
  SAVE_DATA_FAILURE,
} from '../reducers/data';

function joinAPI(data) {
  return axios.post(`http://localhost:3066/data/join`, data);
}

function* join(action) {
  try {
    const result = yield call(joinAPI, action.data);
    // yield delay(1000);
    yield put({
      type: JOIN_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: JOIN_FAILURE,
      error: err.response.data,
    });
  }
}

function saveDataAPI(data) {
  return axios.post(`http://localhost:3066/data/savedata`, data);
}

function* saveData(action) {
  try {
    const result = yield call(saveDataAPI, action.data);
    // yield delay(1000);
    yield put({
      type: SAVE_DATA_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SAVE_DATA_FAILURE,
      error: err.response.data,
    });
  }
}

// Event Listener와 비슷한 역할

function* watchJoin() {
  yield takeLatest(JOIN_REQUEST, join);
}
function* watchSaveData() {
  yield takeLatest(SAVE_DATA_REQUEST, saveData);
}

export default function* dataSaga() {
  yield all([fork(watchJoin), fork(watchSaveData)]);
}
