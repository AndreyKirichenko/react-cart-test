import React from 'react';

import './cart-table.css';

import CartTableItem from '../cart-table-item/cart-table-item';

const CartTable = (props) => {
  const { itemsOnPage, onRemoveItem } = props;
  
  const getRows = () => {
    return itemsOnPage.map((item) => {
      return (
        <CartTableItem onRemoveItem={onRemoveItem} key={item.id} item={item} />
      );
    });
  };

  if(!itemsOnPage.length) return <span>Корзина пуста</span>;

  return (
    <table className='cartTable'>
      <thead>
        <tr className='cartTable__row'>
          <th className='cartTable__cell'>
            Id
          </th>

          <th className='cartTable__cell'>
            Цена
          </th>

          <th className='cartTable__cell'>
            Название
          </th>

          <th className='cartTable__cell'
              rowSpan='2'>
            Опции
          </th>
        </tr>
      </thead>

      <tbody>
        {getRows()}
      </tbody>
    </table>
  );
};

export default CartTable;
