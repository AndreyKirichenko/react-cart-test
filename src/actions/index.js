import DataService from '../services/data-service'

const dataRequested = () => {
  return {
    type: 'FETCH_DATA_REQUEST'
  }
};

const dataLoaded = (data) => {
  return {
    type: 'FETCH_DATA_SUCCESS',
    payload: data
  }
};

const dataError = (error) => {
  return {
    type: 'FETCH_DATA_FAILURE',
    payload: error
  }
};

const fetchData = (dispatch) => () => {
  const dataService = new DataService();
  dispatch(dataRequested());

  const preloadedState = JSON.parse(window.localStorage.getItem('state'));

  return new Promise((resolve, reject) => {
    if(preloadedState && preloadedState.data) {
      dispatch(dataLoaded(preloadedState.data));
      resolve();

    } else {
      dataService.getData()
        .then((data) => {
          dispatch(dataLoaded(data));
          resolve();
        })
        .catch((err) => {
          dispatch(dataError(err));
          reject();
        });
    }
  });
};

const removeItem = (dispatch, id) => () => {
  dispatch({
    type: 'REMOVE_ITEM_FROM_DATA',
    payload: id
  });

  dispatch(updateItemsOnPageCart());
  dispatch(updateCartTotal());
};

const updateItem = (dispatch, itemData) => () => {
  dispatch({
    type: 'UPDATE_ITEM_IN_DATA',
    payload: itemData
  });

  dispatch(updateItemsOnPageCart());
  dispatch(updateCartTotal());
};

const getItem = (itemId) => {
  return {
    type: 'GET_ITEM_FROM_DATA',
    payload: itemId
  };
};

const updateItemsOnPageCart = () => {
  return {
    type: 'UPDATE_ITEMS_ON_PAGE_CART'
  };
};

const updateCartPageNum = (dispatch, num) => () => {
  dispatch({
    type: 'UPDATE_PAGE_CART_NUM',
    payload: num
  });

  dispatch(updateItemsOnPageCart());
  dispatch(updateCartTotal());
};

const updateCartTotal = () => {
  return {
    type: 'UPDATE_CART_TOTAL'
  };
};

export {
  fetchData,
  removeItem,
  updateItem,
  getItem,
  updateCartPageNum
};
