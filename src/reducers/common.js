const initialState = {
  data: [],
  loading: true,
  error: null
};

const removeItem = (state, itemId) => {
  const { data } = state.common;

  const itemIndex = getIndexById(data, itemId);

  const newData = [
    ...data.slice(0, itemIndex),
    ...data.slice(itemIndex + 1)
  ];

  return {
    ...state.common,
    data: newData,
  };
};

const getIndexById = (data, itemId) => {
  return data.findIndex(({ id }) => id === itemId);
};

const updateItem = (state, itemData) => {
  const { data } = state.common;
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
    ...state.common,
    data
  };
};

const createItem = (state, itemData) => {
  const { data } = state.common;

  const { title, price } = itemData;

  return {
    ...state.common,
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

const common = (state, action) => {
  if(state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        data: null,
        loading: true,
        error: null,
      };

    case 'FETCH_DATA_SUCCESS':
      const data = action.payload;

      return {
        data,
        loading: false,
        error: null,
      };

    case 'FETCH_DATA_FAILURE':
      return {
        data: [],
        loading: false,
        error: action.payload
      };

    case 'REMOVE_ITEM_FROM_DATA':
      return removeItem(state, action.payload);

    case 'UPDATE_ITEM_IN_DATA':
      return updateItem(state, action.payload);

    default:
      return state.common;
  }
};

export default common;
