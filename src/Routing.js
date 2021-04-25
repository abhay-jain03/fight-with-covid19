import React, { Suspense, lazy } from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";

const Homepage = lazy(() => import("./Components/HomePage/HomePage"));
const Detail = lazy(() => import("./Components/Detail/DetailPage"));

const RoutingComponent = (props) => {
  return (
    <Suspense fallback={<div></div>}>
      <Router>
        <Switch>
          <Route exact path="/home" component={Homepage} />
          <Route exact path="/requirements" component={Detail} />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
          <Route exact path="/*" render={() => <Redirect to="/home" />} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default RoutingComponent;
