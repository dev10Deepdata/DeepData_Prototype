import produce from '../utils/produce';

export const initialState = {
  map: null,
  position: null,
  cityCompany: null,
  setPositionLoading: null,
  setPositionDone: null,
  setPositionError: null,
};

export const SET_POSITION_REQUEST = 'SET_POSITION_REQUEST';
export const SET_POSITION_SUCCESS = 'SET_POSITION_SUCCESS';
export const SET_POSITION_FAILURE = 'SET_POSITION_FAILURE';

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
        console.log('position: ', action.data);
        break;
      case SET_POSITION_FAILURE:
        draft.setPositionLoading = false;
        draft.setPositionError = action.error;
        break;
      default:
        break;
    }
  });
};
export default reducer;
