import React from 'react';

import './app.css';

import CartTable from '../cart-table';
import Paginator from '../paginator';

const App = () => {

  return (
    <main role='main' className='app'>
      <h1>Апп!</h1>
      <CartTable/>
      <Paginator/>
    </main>
  );
};

export default App;
