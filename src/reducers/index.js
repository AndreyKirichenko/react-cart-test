const initialState = {
  data: [],
  loading: true,
  error: null,
  itemsAmount: 0,
  total: 0
};

const removeItem = (state, itemId) => {
  const { data } = state.data;

  const item = getItemById(data, itemId);

  console.log(item);

  return {
    ...state
  }
};

const getItemById = (items, itemId) => {
  return items.find((item) => item.id === itemId);
};

// const getItemIndexById =

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

  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        data: [],
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

    default:
      return state;
  }
};

export default reducer;