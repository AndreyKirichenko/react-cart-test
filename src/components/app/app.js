import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import './app.css';

import ErrorBoundary from '../error-boundary';
import PageCart from '../page-cart';
import PageItem from '../page-item';
import store from "../../store";

store.subscribe(() => {
  const { data } = store.getState();
  if(data) {
    const stateToPersist = JSON.stringify(store.getState());
    window.localStorage.setItem('state', stateToPersist);
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Switch>
            <Route path='/' component={PageCart} exact />
            <Route path='/cart/:page' component={PageCart} />
            <Route path='/item' component={PageItem} exact />
            <Route path='/item/:id' component={PageItem} />
          </Switch>
        </Router>
      </ErrorBoundary>
    </Provider>
  );
};

export default App;
