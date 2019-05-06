const initialState = {
  data: [],
  loading: true,
  error: null,
  cartTotal: {
    itemsAmount: 0,
    total: 0,
  },
  pageItem: {
    title: '',
    price: 0
  },
  pageCart: {
    pageNum: 1,
    itemsPerPage: 5,
    itemsOnPage: [],
    pagesQuantity: 1
  }
};

const updateCartPageNum = (state, pageNum) => {
  return {
    ...state,
    pageCart: {
      ...state.pageCart,
      pageNum,
    }
  }
};

const updateItemsOnPageCart = (state) => {
  const { data, pageCart: { itemsPerPage, pageNum }  } = state;

  const pagesQuantity = getPagesQuantityOnCartPage(data, itemsPerPage, pageNum);

  let itemsOnPage = getItemsOnPageCart(data, itemsPerPage, pageNum);

  if(!itemsOnPage.length) {
    itemsOnPage = getItemsOnPageCart(data, itemsPerPage, pagesQuantity);
  }

  return {
    ...state,
    pageCart: {
      ...state.pageCart,
      itemsOnPage,
      pagesQuantity
    }
  }
};

const getItemsOnPageCart = (data, itemsPerPage, pageNum) => {
  const startIdx = itemsPerPage * (pageNum - 1);
  const endIdx = startIdx + itemsPerPage;

  return [
    ...data.slice(startIdx, endIdx)
  ]
};

const getPagesQuantityOnCartPage = (date, itemsPerPage) => {
  return Math.ceil(date.length / itemsPerPage);
};

const updateItem = (state, itemData) => {
  const { data } = state;
  const { id, title, price } = itemData;

  if(!data.length || !id ) {
    return createItem(state, itemData);
  }

  const idx = getIndexById(data, id);

  data[idx] = {
    id,
    title,
    price
  };

  return {
    ...state,
    data
  };
};

const createItem = (state, itemData) => {
  const { data } = state;

  const { title, price } = itemData;

  return {
    ...state,
    data: [
      ...data,
      {
        id: getNewItemId(data),
        title,
        price

      }]
  };
};

const getNewItemId = (data) => {
  const compare = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  };

  if (!data || !data.length) {
    return 1;
  }

  return data.sort(compare)[data.length - 1].id + 1;
};

const getItem = (state, itemId) => {
  const itemIndex = getIndexById(state.data, itemId);

  const pageItem = state.data[itemIndex] || {
    title: 'Новый торт',
    price: 100
  };

  return {
    ...state,
    pageItem
  }
};

const removeItem = (state, itemId) => {
  const { data } = state;

  const itemIndex = getIndexById(data, itemId);

  const newData = [
    ...data.slice(0, itemIndex),
    ...data.slice(itemIndex + 1)
  ];

  return {
    ...state,
    data: newData,
  }
};

const getIndexById = (data, itemId) => {
  return data.findIndex(({ id }) => id === itemId);
};

const updateCartTotal = (state) => {
  const { data } = state;
  return {
    ...state,
    cartTotal: {
      itemsAmount: getItemsAmount(data),
      total: getTotal(data)
    }
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

const reducer = (state, action) => {
  if(state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        data: null,
        loading: true,
        error: null,
        itemsAmount: 0,
        total: 0
      };

    case 'FETCH_DATA_SUCCESS':
      const data = action.payload;

      const itemsAmount = getItemsAmount(data);

      const total = getTotal(data);

      return {
        ...state,
        data,
        loading: false,
        error: null,
        itemsAmount,
        total
      };

    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload
      };

    case 'REMOVE_ITEM_FROM_DATA':
      return removeItem(state, action.payload);

    case 'UPDATE_ITEM_IN_DATA':
      return updateItem(state, action.payload);

    case 'GET_ITEM_FROM_DATA':
      return getItem(state, action.payload);

    case 'UPDATE_ITEMS_ON_PAGE_CART':
      return updateItemsOnPageCart(state);

    case 'UPDATE_PAGE_CART_NUM':
      return updateCartPageNum(state, action.payload);

    case 'UPDATE_CART_TOTAL':
      return updateCartTotal(state);

    default:
      return state;
  }
};

export default reducer;