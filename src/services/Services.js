import HttpCalls from "./ApiCall";

export const _getLocations = async (location) => {
  let { _do_call } = HttpCalls;
  let headers = await headersData();
  return _do_call("GET", `/maps/api/place/textsearch/json?query=${location}&key=AIzaSyDDGwEVNY_qUbOeOIM75CPeXwXLKs4t_Sc`, headers);
};


const headersData = async (cookies) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "access-control-allow-origin" : "*",
    },
  };
};

export default {
  headersData,
  _getLocations,
};
