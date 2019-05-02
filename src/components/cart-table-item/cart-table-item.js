import React from 'react';

const CartTableItem = (props) => {
  const { id, title, price } = props.item;

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
        изменить
      </td>

      <td className='cartTable__cell'>
        удалить
      </td>
    </tr>
  );
};

export default CartTableItem;
