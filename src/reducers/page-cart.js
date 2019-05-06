const initialState = {
  pageNum: 1,
  itemsPerPage: 5,
  itemsOnPage: [],
  pagesQuantity: 1
};

const updateItemsOnPageCart = (state) => {
  const { common: { data }, pageCart: { itemsPerPage, pageNum }  } = state;

  const pagesQuantity = getPagesQuantityOnCartPage(data, itemsPerPage, pageNum);

  let itemsOnPage = getItemsOnPageCart(data, itemsPerPage, pageNum);

  if(!itemsOnPage.length) {
    itemsOnPage = getItemsOnPageCart(data, itemsPerPage, pagesQuantity);
  }

  return {
    ...state.pageCart,
    itemsOnPage,
    pagesQuantity
  }
};

const getPagesQuantityOnCartPage = (date, itemsPerPage) => {
  return Math.ceil(date.length / itemsPerPage);
};

const getItemsOnPageCart = (data, itemsPerPage, pageNum) => {
  const startIdx = itemsPerPage * (pageNum - 1);
  const endIdx = startIdx + itemsPerPage;

  return [
    ...data.slice(startIdx, endIdx)
  ]
};

const updateCartPageNum = (state, pageNum) => {
  return {
    ...state.pageCart,
    pageNum,
  }
};

const pageCart = (state, action) => {

  if(state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'UPDATE_ITEMS_ON_PAGE_CART':
      return updateItemsOnPageCart(state);

    case 'UPDATE_PAGE_CART_NUM':
      return updateCartPageNum(state, action.payload);

    default:
      return state.pageCart;
  }
};

export default pageCart;
