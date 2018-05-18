import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import registerServiceWorker from './registerServiceWorker';

import "assets/css/material-dashboard-react.css";
import indexRoutes from "routes/index.jsx";
import Root from "./containers/App/Root";
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const hist = createBrowserHistory();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(
      applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <Router history={hist}>
      <Root 
        store={store}
      />
  </Router>, 
  document.getElementById('root')
);

registerServiceWorker();

