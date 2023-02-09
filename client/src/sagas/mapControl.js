import { all, fork, put, takeLatest, call, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  CREATE_COMPANY_MARKER_FAILURE,
  CREATE_COMPANY_MARKER_REQUEST,
  CREATE_COMPANY_MARKER_SUCCESS,
  CREATE_COMPANY_OVERLAY_FAILURE,
  CREATE_COMPANY_OVERLAY_REQUEST,
  CREATE_COMPANY_OVERLAY_SUCCESS,
  LOAD_COMPANY_DATA_FAILURE,
  LOAD_COMPANY_DATA_REQUEST,
  LOAD_COMPANY_DATA_SUCCESS,
  REMOVE_COMPANY_DATA_FAILURE,
  REMOVE_COMPANY_DATA_REQUEST,
  REMOVE_COMPANY_DATA_SUCCESS,
  REMOVE_COMPANY_OVERLAY_FAILURE,
  REMOVE_COMPANY_OVERLAY_REQUEST,
  REMOVE_COMPANY_OVERLAY_SUCCESS,
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
  return axios.get(`http://localhost:3066/data/loadwk/${data.region}`, data);
}

function* loadComapnyData(action) {
  try {
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

function* removeComapnyData() {
  try {
    yield put({
      type: REMOVE_COMPANY_DATA_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMPANY_DATA_FAILURE,
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
function* createCompanyOverlay(action) {
  try {
    yield put({
      type: CREATE_COMPANY_OVERLAY_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CREATE_COMPANY_OVERLAY_FAILURE,
      error: err.response.data,
    });
  }
}
function* removeCompanyOverlay() {
  try {
    yield put({
      type: REMOVE_COMPANY_OVERLAY_SUCCESS,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_COMPANY_OVERLAY_FAILURE,
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
function* watchRemoveCompanyData() {
  yield takeLatest(REMOVE_COMPANY_DATA_REQUEST, removeComapnyData);
}
function* watchCreateCompanyMarkerData() {
  yield takeLatest(CREATE_COMPANY_MARKER_REQUEST, createCompanyMarker);
}
function* watchCreateCompanyOverlayData() {
  yield takeLatest(CREATE_COMPANY_OVERLAY_REQUEST, createCompanyOverlay);
}
function* watchRemoveCompanyOverlayData() {
  yield takeLatest(REMOVE_COMPANY_OVERLAY_REQUEST, removeCompanyOverlay);
}

export default function* dataSaga() {
  yield all([fork(watchSetPosition)]);
  yield all([fork(watchLoadCompanyData)]);
  yield all([fork(watchRemoveCompanyData)]);
  yield all([fork(watchCreateCompanyMarkerData)]);
  yield all([fork(watchCreateCompanyOverlayData)]);
  yield all([fork(watchRemoveCompanyOverlayData)]);
}
