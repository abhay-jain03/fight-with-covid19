import React, { Suspense, lazy } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

const Homepage = lazy(() => import("./Components/HomePage/HomePage"));

const RoutingComponent = (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
          <Route exact path="/" component={Homepage} />
          {/* <Route exact path="/" render={() => <Redirect to="/home" />} /> */}
          <Route exact path="/*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default RoutingComponent;
