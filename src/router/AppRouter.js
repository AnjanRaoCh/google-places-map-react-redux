import React, { Component } from "react";
import { BrowserRouter as Router, Route,Switch  } from "react-router-dom";
import Home from "../screens/home/Index";


class AppRouter extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Router />
      </Switch>
    );
  }
}

export default AppRouter;
