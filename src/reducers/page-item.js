import { getIndexById } from './utils';

const initialState = {
  title: '',
  price: 0
};

const getItem = (state, itemId) => {
  const {data} = state.common;
  const itemIndex = getIndexById(data, itemId);

  const pageItem = data[itemIndex] || {
    title: 'Новый торт',
    price: 100
  };

  return pageItem;
};

const pageItem = (state, action) => {
  if(state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'GET_ITEM_FROM_DATA':
      return getItem(state, action.payload);

    default:
      return state.pageItem;
  }
};

export default pageItem;
