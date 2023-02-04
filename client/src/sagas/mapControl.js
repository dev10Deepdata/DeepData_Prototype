import { all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  CREATE_COMPANY_MARKER_FAILURE,
  CREATE_COMPANY_MARKER_REQUEST,
  CREATE_COMPANY_MARKER_SUCCESS,
  LOAD_COMPANY_DATA_FAILURE,
  LOAD_COMPANY_DATA_REQUEST,
  LOAD_COMPANY_DATA_SUCCESS,
  SET_POSITION_FAILURE,
  SET_POSITION_REQUEST,
  SET_POSITION_SUCCESS,
} from '../reducers/mapControl';
import { useSelector } from 'react-redux';

// function setPositionAPI(data) {
//   return axios.get(`post/${data}`);
// }

function* setPosition(action) {
  try {
    // const result = yield call(setPositionAPI, action.data);
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

function loadCompanyDataAPI(data) {
  console.log('loadApi datal: ', data);
  return axios.get(`http://localhost:3066/data/loadwk/${data.region}`, data);
}

function* loadComapnyData(action) {
  try {
    console.log('loadwkSaga');
    const result = yield call(loadCompanyDataAPI, action.data);
    yield put({
      type: LOAD_COMPANY_DATA_SUCCESS,
      data: result,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_COMPANY_DATA_FAILURE,
      error: err.response.data,
    });
  }
}

// function createCompanyMarkerAPI(data) {
//   console.log('loadApi datal: ', data);
//   return axios.get(`http://localhost:3066/data/loadwk/${data.region}`, data);
// }

function* createCompanyMarker(action) {
  try {
    console.log('Saga data action: ', action);
    // const result = yield call(createCompanyMarkerAPI, action.data);
    yield put({
      type: CREATE_COMPANY_MARKER_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CREATE_COMPANY_MARKER_FAILURE,
      error: err.response.data,
    });
  }
}

// Event Listener와 비슷한 역할
function* watchSetPosition() {
  yield takeLatest(SET_POSITION_REQUEST, setPosition);
}
function* watchLoadCompanyData() {
  yield takeLatest(LOAD_COMPANY_DATA_REQUEST, loadComapnyData);
}
function* watchCreateCompanyMarkerData() {
  yield takeLatest(CREATE_COMPANY_MARKER_REQUEST, createCompanyMarker);
}

export default function* dataSaga() {
  yield all([fork(watchSetPosition)]);
  yield all([fork(watchLoadCompanyData)]);
  yield all([fork(watchCreateCompanyMarkerData)]);
}
