const initialState = {
  data: [],
  loading: true,
  error: null,
  itemsAmount: 0,
  total: 0,
  pageItem: {}
};

const updateItem = (state, itemData) => {
  const { data } = state;
  const { title, price } = itemData;
  let { id } = itemData;

  if(!id) {
    id = getHighestItemId(data) + 1;
  }

  

  const newData = [
    ...data,
    {
      id,
      title,
      price
    }
  ];

  return {
    ...state,
    data: newData
  };
};

const getHighestItemId = (data) => {
  const compare = (a, b) => {
    if (a.id < b.id) {
      return -1;
    }
    if (a.id > b.id) {
      return 1;
    }
    return 0;
  };

  return data.sort(compare)[data.length - 1].id;
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

  const itemsAmount = getItemsAmount(newData);

  const total = getTotal(newData);

  return {
    ...state,
    data: newData,
    itemsAmount,
    total
  }
};

const getIndexById = (data, itemId) => {
  return data.findIndex(({ id }) => id === itemId);
};

const getItemsAmount = (data) => {
  return data.length;
};

const getTotal = (data) => {
  const total = data.reduce((acc, item) => {
    return acc + item.price;
  }, 0);

  return total;
};

const reducer = (state, action) => {
  if(state === undefined) {
    return initialState;
  }

  console.log(action.type);

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

    case 'ITEM_REMOVED_FROM_DATA':
      return removeItem(state, action.payload);

    case 'ITEM_UPDATED_IN_DATA':
      return updateItem(state, action.payload);

    case 'ITEM_GET_FROM_DATA':
      return getItem(state, action.payload);

    default:
      return state;
  }
};

export default reducer;