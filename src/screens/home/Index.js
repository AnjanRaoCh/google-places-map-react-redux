import { connect } from "react-redux";
import HomeScreen from "./Home";
import { getLocationsListRequest, setRecentList } from "../../redux/actions/PlacesAction";

function mapStateToProps(state) {
  return {
    locationsList: state.locations.locationsList,
    recentSearchList: state.locations.recentSearchList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadLocations: (payload) => dispatch(getLocationsListRequest(payload)),
    setRecentSearch: (payload) => dispatch(setRecentList(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
