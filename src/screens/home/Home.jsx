import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { _getLocations } from "../../services/Services";

import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";
import {MarkerWithLabel} from 'react-google-maps/lib/components/addons/MarkerWithLabel'

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDDGwEVNY_qUbOeOIM75CPeXwXLKs4t_Sc&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%`, width: `100%` }} />,
    containerElement: <div style={{ height: `100vh`, width: `100%` }} />,
    mapElement: <div style={{ height: `100%`, width: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => {
  let { isMarkerShown, lat, lng, value } = props;

  return (
    <GoogleMap zoom={8} center={{ lat: lat, lng: lng }}>
      {isMarkerShown && (
        <Marker
          label={value == null ? "" : value.name}
          position={{ lat: lat, lng: lng }}
          labelStyle={{
            textAlign: "center",
            color:"red",
            width:  "50px",
            backgroundColor: "#7ff0c4",
            border:"10px",
            fontSize: "14px",
            padding: "50px"
          }}
        >

        </Marker>
      )}
    </GoogleMap>
  );
});

function Home({
  loadLocations,
  locationsList,
  setRecentSearch,
  recentSearchList,
}) {
  console.log(locationsList, recentSearchList, " locationsList ");
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState(locationsList);
  const loaded = React.useRef(false);
  const [lat, setLat] = React.useState(17.3850);
  const [lng, setLng] = React.useState(78.4867);

  const getPlaces = (newInputValue) => {
    loadLocations(newInputValue);
  };
  useEffect(() => {
    setOptions(locationsList);
  }, [locationsList]);

  return (
    <div>
      <Helmet>
        <meta content="Place Autocomplete" property="og:title" />
        <meta name="description" content="Place Autocomplete" />
        <meta name="keywords" content="Place Autocomplete" />
        <link rel="canonical" href={window.location.href} />
        <title>Place Autocomplete</title>
      </Helmet>
      <div className="">
        <Grid container>
          <Grid item xs={4}>
            <div className="auto-cpml">
              <Autocomplete
                id="google-map-demo"
                sx={{ width: 300 }}
                getOptionLabel={(option) =>
                  typeof option === "string" ? option : option.name
                }
                filterOptions={(x) => x}
                options={options}
                autoComplete
                includeInputInList
                filterSelectedOptions
                value={value}
                onChange={(event, newValue) => {
                  setOptions(newValue ? [newValue, ...options] : options);
                  setValue(newValue);
                }}
                onInputChange={(event, newInputValue) => {
                    console.log("Hello");
                  setInputValue(newInputValue);
                  getPlaces(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search your loaction"
                    fullWidth
                  />
                )}
                renderOption={(props, option) => {
                  return (
                    <li {...props}>
                      <Grid
                        container
                        alignItems="center"
                        onClick={() => {
                          setLat(option.geometry.location.lat);
                          setLng(option.geometry.location.lng);
                          if(!recentSearchList.find(res=>res.name == option.name)){
                            setRecentSearch(option);
                          }
                        }}
                      >
                        <Grid item>
                          <Box
                            component={LocationOnIcon}
                            sx={{ color: "text.secondary", mr: 2 }}
                          />
                        </Grid>
                        <Grid item xs>
                          <div color="text.secondary" className="custom-font">
                            {option.name}
                          </div>
                          <Typography variant="body2" color="text.secondary">
                            {option.formatted_address}
                          </Typography>
                        </Grid>
                      </Grid>
                    </li>
                  );
                }}
              />
            </div>
            <hr />
            <div className="recent-text">Recent Searches</div>
            {recentSearchList.map(res=>(
              <div className="recent-search-text">{res.name}</div>
            ))}
          </Grid>
          <Grid item xs>
            <MyMapComponent isMarkerShown lat={lat} lng={lng} value={value} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Home;
