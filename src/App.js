import React from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.scss";
import Layout from "./components/Layout";
import ReactGA from 'react-ga';
import { GA_TRACKING_ID } from "./config";

const TRACKING_ID = GA_TRACKING_ID;

ReactGA.initialize(TRACKING_ID);

const RouteChangeTracker = ({ history }) => {

  history && history.listen((location) => {
      ReactGA.set({ page: location.pathname });
      ReactGA.pageview(location.pathname);
  });

  return <div></div>;
};
const Test = withRouter(RouteChangeTracker)

const App = (props) => {
  
  return (
    <Provider store={store}>
      <Router>
        <Test />
        <Layout />
      </Router>
    </Provider>
  );
};
export default App;
