import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import ReduxProvider from './configureRedux';
import reportWebVitals from './reportWebVitals';

import MainFrame from './Routes/MainFrame';

import { ROUTES } from './Routes.constants';
import { CommonUtils } from './utils/commonUtils';

import 'antd/dist/antd.css';
import './index.scss';


ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider>
      <Router>
        <Switch>
          <Route path={ROUTES.INDEX} component={MainFrame} />
          <Redirect from='*' to={ROUTES.INDEX} />
        </Switch>
      </Router>
      <ToastContainer />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
