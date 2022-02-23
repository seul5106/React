import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom"

import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";

import rootReducer from './reducer';

const logger = createLogger();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, ReduxThunk)));


ReactDOM.render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
