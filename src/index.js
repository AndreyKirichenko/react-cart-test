import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';

import store from './store';
import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import { DataSerivceProvider } from './components/data-service-context';
import DataService from './services/data-service';

const dataService = new DataService();

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <DataSerivceProvider value={dataService}>
        <App/>
      </DataSerivceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
