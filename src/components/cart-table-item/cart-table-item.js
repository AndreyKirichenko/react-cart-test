import React from 'react';

import { Link } from 'react-router-dom';

const CartTableItem = (props) => {
  const { onRemoveItem, item: { id, title, price }} = props;

  return (
    <tr className='cartTable__row'>
      <td className='cartTable__cell'>
        {id}
      </td>

      <td className='cartTable__cell'>
        {price}р
      </td>

      <td className='cartTable__cell'>
        {title}
      </td>

      <td className='cartTable__cell'>
        <Link to={`/item/${id}`}>изменить</Link>
      </td>

      <td className='cartTable__cell'>
        <span className='link'
              onClick={() => onRemoveItem(id)}>
          удалить
        </span>
      </td>
    </tr>
  );
};

export default CartTableItem;
