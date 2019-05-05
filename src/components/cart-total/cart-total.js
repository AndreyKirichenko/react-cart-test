import React from 'react';

const CartTotal = (props) => {
  const { itemsAmount, total } = props;

  if (!itemsAmount) return null;

  return (
    <div>В корзине {itemsAmount} товаров на {total} рублей</div>
  );
};

export default CartTotal;
