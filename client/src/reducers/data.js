import produce from '../utils/produce';

export const initialState = {
  me: null,
  cnData: null,
  joinLoading: false,
  joinDone: false,
  joinError: null,
  cnDataLoadLoading: false,
  cnDataLoadDone: false,
  cnDataLoadError: null,
  saveDataLoading: false,
  saveDataDone: false,
  saveDataError: null,
};

export const JOIN_REQUEST = 'JOIN_REQUEST';
export const JOIN_SUCCESS = 'JOIN_SUCCESS';
export const JOIN_FAILURE = 'JOIN_FAILURE';

export const CN_DATA_LOAD_REQUEST = 'CN_DATA_LOAD_REQUEST';
export const CN_DATA_LOAD_SUCCESS = 'CN_DATA_LOAD_SUCCESS';
export const CN_DATA_LOAD_FAILURE = 'CN_DATA_LOAD_FAILURE';

export const SAVE_DATA_REQUEST = 'SAVE_DATA_REQUEST';
export const SAVE_DATA_SUCCESS = 'SAVE_DATA_SUCCESS';
export const SAVE_DATA_FAILURE = 'SAVE_DATA_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case JOIN_REQUEST:
        draft.joinLoading = true;
        draft.joinDone = false;
        draft.joinError = null;
        break;
      case JOIN_SUCCESS:
        draft.joinLoading = false;
        draft.joinDone = true;
        draft.me = action.data.data;
        console.log('reduce: ', action.data.data);
        break;
      case JOIN_FAILURE:
        draft.joinLoading = false;
        draft.joinError = action.error;
        break;
      case CN_DATA_LOAD_REQUEST:
        draft.cnDataLoadLoading = true;
        draft.cnDataLoadDone = false;
        draft.cnDataLoadError = null;
        break;
      case CN_DATA_LOAD_SUCCESS:
        draft.cnDataLoadLoading = false;
        draft.cnDataLoadDone = true;
        draft.cnData = action.data;
        // action.data['CnDivision'].map((v) => draft.cnData.push());
        console.log('cnData_reducer: ', action.data);
        break;
      case CN_DATA_LOAD_FAILURE:
        draft.cnDataLoadLoading = false;
        draft.cnDataLoadError = action.error;
        break;
      case SAVE_DATA_REQUEST:
        draft.saveDataLoading = true;
        draft.saveDataDone = false;
        draft.saveDataError = null;
        break;
      case SAVE_DATA_SUCCESS:
        draft.saveDataLoading = false;
        draft.saveDataDone = true;
        // draft.saveDataction.data;
        // action.data['CnDivision'].map((v) => draft.cnData.push());
        console.log('saveData: ', action.data);
        alert('success');
        break;
      case SAVE_DATA_FAILURE:
        draft.saveDataLoading = false;
        draft.saveDataError = action.error;
        break;
      default:
        break;
    }
  });
};
export default reducer;
