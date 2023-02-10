import produce from '../utils/produce';

export const initialState = {
  map: null,
  position: null,
  cityCompany: null,
  selectTown: null,
  countOverlay: [],
  customCountOverlay: [],
  tempCountOverlay: [],
  removeOverlay: false,
  setPositionLoading: null,
  setPositionDone: null,
  setPositionError: null,
  loadCompanyDataLoading: false,
  loadCompanyDataDone: false,
  loadCompanyDataError: null,
  removeCompanyDataLoading: false,
  removeCompanyDataDone: false,
  removeCompanyDataError: null,
  createCompanyMarkerLoading: false,
  createCompanyMarkerDone: false,
  createCompanyMarkerError: null,
  createCompanyOverlayLoading: false,
  createCompanyOverlayDone: false,
  createCompanyOverlayError: null,
  removeCompanyOverlayLoading: false,
  removeCompanyOverlayDone: false,
  removeCompanyOverlayError: null,
  removeOverlayLoading: false,
  removeOverlayDone: false,
  removeOverlayError: null,
};

export const SET_POSITION_REQUEST = 'SET_POSITION_REQUEST';
export const SET_POSITION_SUCCESS = 'SET_POSITION_SUCCESS';
export const SET_POSITION_FAILURE = 'SET_POSITION_FAILURE';

export const LOAD_COMPANY_DATA_REQUEST = 'LOAD_COMPANY_DATA_REQUEST';
export const LOAD_COMPANY_DATA_SUCCESS = 'LOAD_COMPANY_DATA_SUCCESS';
export const LOAD_COMPANY_DATA_FAILURE = 'LOAD_COMPANY_DATA_FAILURE';

export const REMOVE_COMPANY_DATA_REQUEST = 'REMOVE_COMPANY_DATA_REQUEST';
export const REMOVE_COMPANY_DATA_SUCCESS = 'REMOVE_COMPANY_DATA_SUCCESS';
export const REMOVE_COMPANY_DATA_FAILURE = 'REMOVE_COMPANY_DATA_FAILURE';

export const CREATE_COMPANY_MARKER_REQUEST = 'CREATE_COMPANY_MAKER_REQUEST';
export const CREATE_COMPANY_MARKER_SUCCESS = 'CREATE_COMPANY_MAKER_SUCCESS';
export const CREATE_COMPANY_MARKER_FAILURE = 'CREATE_COMPANY_MAKER_FAILURE';

export const CREATE_COMPANY_OVERLAY_REQUEST = 'CREATE_COMPANY_OVERLAY_REQUEST';
export const CREATE_COMPANY_OVERLAY_SUCCESS = 'CREATE_COMPANY_OVERLAY_SUCCESS';
export const CREATE_CUSTOM_COMPANY_OVERLAY_SUCCESS =
  'CREATE_CUSTOM_COMPANY_OVERLAY_SUCCESS';
export const CREATE_COMPANY_OVERLAY_FAILURE = 'CREATE_COMPANY_OVERLAY_FAILURE';

export const REMOVE_COMPANY_OVERLAY_REQUEST = 'REMOVE_COMPANY_OVERLAY_REQUEST';
export const REMOVE_COMPANY_OVERLAY_SUCCESS = 'REMOVE_COMPANY_OVERLAY_SUCCESS';
export const REMOVE_OVERLAY_SUCCESS = 'REMOVE_OVERLAY_SUCCESS';
export const REMOVE_COMPANY_OVERLAY_FAILURE = 'REMOVE_COMPANY_OVERLAY_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_POSITION_REQUEST:
        draft.setPositionLoading = true;
        draft.setPositionDone = false;
        draft.setPositionError = null;
        break;
      case SET_POSITION_SUCCESS:
        draft.setPositionLoading = false;
        draft.setPositionDone = true;
        draft.position = action.data;
        break;
      case SET_POSITION_FAILURE:
        draft.setPositionLoading = false;
        draft.setPositionError = action.error;
        break;
      case LOAD_COMPANY_DATA_REQUEST:
        draft.loadCompanyDataLoading = true;
        draft.loadCompanyDataDone = false;
        draft.loadCompanyDataError = null;
        break;
      case LOAD_COMPANY_DATA_SUCCESS:
        draft.loadCompanyDataLoading = false;
        draft.loadCompanyDataDone = true;
        draft.cityCompany = action.data.data;
        break;
      case LOAD_COMPANY_DATA_FAILURE:
        draft.loadCompanyDataLoading = false;
        draft.loadCompanyDataError = action.error;
        break;
      case REMOVE_COMPANY_DATA_REQUEST:
        draft.removeCompanyDataLoading = true;
        draft.removeCompanyDataDone = false;
        draft.removeCompanyDataError = null;
        break;
      case REMOVE_COMPANY_DATA_SUCCESS:
        draft.removeCompanyDataLoading = false;
        draft.removeCompanyDataDone = true;
        draft.cityCompany = null;
        break;
      case REMOVE_COMPANY_DATA_FAILURE:
        draft.removeCompanyDataLoading = false;
        draft.removeCompanyDataError = action.error;
        break;
      case CREATE_COMPANY_MARKER_REQUEST:
        draft.createCompanyMarkerLoading = true;
        draft.createCompanyMarkerDone = false;
        draft.createCompanyMarkerError = null;
        break;
      case CREATE_COMPANY_MARKER_SUCCESS:
        draft.createCompanyMarkerLoading = false;
        draft.createCompanyMarkerDone = true;
        draft.selectTown = action.data;
        break;
      case CREATE_COMPANY_MARKER_FAILURE:
        draft.createCompanyMarkerLoading = false;
        draft.createCompanyMarkerError = action.error;
        break;
      case CREATE_COMPANY_OVERLAY_REQUEST:
        draft.createCompanyOverlayLoading = true;
        draft.createCompanyOverlayDone = false;
        draft.createCompanyOverlayError = null;
        break;
      case CREATE_COMPANY_OVERLAY_SUCCESS:
        draft.createCompanyOverlayLoading = false;
        draft.createCompanyOverlayDone = true;
        draft.countOverlay.push(action.data);
        break;
      case CREATE_CUSTOM_COMPANY_OVERLAY_SUCCESS:
        draft.customCountOverlay.push(action.data);
        break;
      case CREATE_COMPANY_OVERLAY_FAILURE:
        draft.createCompanyOverlayLoading = false;
        draft.createCompanyOverlayError = action.error;
        break;
      case REMOVE_COMPANY_OVERLAY_REQUEST:
        draft.removeCompanyOverlayLoading = true;
        draft.removeCompanyOverlayDone = false;
        draft.removeCompanyOverlayError = null;
        break;
      case REMOVE_COMPANY_OVERLAY_SUCCESS:
        draft.removeCompanyOverlayLoading = false;
        draft.removeCompanyOverlayDone = true;
        draft.tempCountOverlay = draft.countOverlay;
        draft.removeOverlay = true;
        draft.countOverlay = [];
        break;
      case REMOVE_OVERLAY_SUCCESS:
        draft.removeOverlay = false;
        draft.tempCountOverlay = [];
        draft.customCountOverlay = [];
        break;
      case REMOVE_COMPANY_OVERLAY_FAILURE:
        draft.removeCompanyOverlayLoading = false;
        draft.removeCompanyOverlayError = action.error;
        break;
      default:
        break;
    }
  });
};
export default reducer;
