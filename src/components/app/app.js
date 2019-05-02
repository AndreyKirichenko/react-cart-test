import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';


import { Provider } from 'react-redux';
import { DataSerivceProvider } from '../data-service-context';
import DataService from '../../services/data-service';

import ErrorBoundary from '../error-boundary';
import PageCart from '../page-cart';
import PageItem from '../page-item';
import store from "../../store";

const dataService = new DataService();

const App = () => {

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <DataSerivceProvider value={dataService}>
          <Router>
            <Route path='/' component={PageCart} exact />
            <Route path='/cart/:page' component={PageCart} exact />
            <Route path='/item' component={PageItem} exact />
            <Route path='/item/:id' component={PageItem} exact />
          </Router>
        </DataSerivceProvider>
      </ErrorBoundary>
    </Provider>

  );
};

export default App;
