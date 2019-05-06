import common from './common';
import pageItem from './page-item';
import pageCart from './page-cart';
import cartTotal from './cart-total';

const reducer = (state, action) => {
  return {
    common: common(state, action),
    pageItem: pageItem(state, action),
    pageCart: pageCart(state, action),
    cartTotal: cartTotal(state, action)
  }
};

export default reducer;