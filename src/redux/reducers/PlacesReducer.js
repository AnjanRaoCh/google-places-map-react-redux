import { LOCATIONS_LIST, RECENT_SEARCH } from "../actions/ActionType";

const INITIAL_STATE = {
  locationsList: [],
  recentSearchList: [],
  loading: false,
  loaded: false,
  error: null,
};

const locationsReducer = (state = INITIAL_STATE, action) => {
  console.log(state)
  switch (action.type) {
    case LOCATIONS_LIST:
      return {
        ...state,
        locationsList: action.payload,
      };
    case RECENT_SEARCH:
      return {
        ...state,
        recentSearchList: [...state.recentSearchList ,...[action.payload]],
      };
    default:
      return state;
  }
};

export default locationsReducer;
