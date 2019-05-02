import React from 'react';
import { Link } from 'react-router-dom';

import './page-cart.css';

import CartTable from '../cart-table';
import Paginator from '../paginator';
import CartTotal from "../cart-total";

const PageCart = (props) => {

  return (
    <div className='pageCart'>
      <div className='pageCart__header'>
        <h1 className='pageCart__title'>Корзина</h1>
        <Link to='/item' className='button'>Добавить торт</Link>
      </div>
      <div className='pageCart__cartTable'>
        <CartTable/>
      </div>

      <div className='pageCart__total'>
        <CartTotal/>
      </div>
      <Paginator/>
    </div>
  );
};

export default PageCart;
