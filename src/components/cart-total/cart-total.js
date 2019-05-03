import React from 'react';
import {compose} from 'redux';

import {connect} from 'react-redux';

const CartTotal = (props) => {
  const { itemsAmount, total } = props;

  if (itemsAmount === 0) return null;

  return (
    <div>В корзине {itemsAmount} товаров на {total} рублей</div>
  );
};

const mapStateToProps = ({ itemsAmount, total }) => {
  return {
    itemsAmount,
    total
  };
};

export default compose(
  connect(mapStateToProps)
)(CartTotal);

