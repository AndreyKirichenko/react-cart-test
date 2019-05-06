const initialState = {
  itemsAmount: 0,
  total: 0
};

const updateCartTotal = (state) => {
  const { data } = state.common;
  return {
    itemsAmount: getItemsAmount(data),
    total: getTotal(data)
  }
};

const getItemsAmount = (data) => {
  return data.length;
};

const getTotal = (data) => {
  return data.reduce((acc, item) => {
    return acc + parseInt(item.price);
  }, 0);
};

const cartTotal = (state, action) => {

  if(state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'UPDATE_CART_TOTAL':
      return updateCartTotal(state);

    default:
      return state.cartTotal;
  }
};

export default cartTotal;
