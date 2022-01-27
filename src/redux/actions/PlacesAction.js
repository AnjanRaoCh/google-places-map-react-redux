import { LOCATIONS_LIST, RECENT_SEARCH } from "./ActionType";
import { _getLocations } from "../../services/Services";

export const getLocationsListSuccess = (data) => {
  return {
    type: LOCATIONS_LIST,
    payload: data,
  };
};

export const getRecentSearchSuccess = (data) => {
  return {
    type: RECENT_SEARCH,
    payload: data,
  };
};

export const getLocationsListRequest = (payload) => {
  return (dispatch) => {
    _getLocations(payload)
      .then((response) => {
        console.log(response);
        dispatch(getLocationsListSuccess(response.results));
      })
      .catch((error) => {
        //   dispatch(getLocationsListFailed(error));
      });
  };
};

export const setRecentList = (payload) => {
  return (dispatch) => {
    dispatch(getRecentSearchSuccess(payload));
  };
};
