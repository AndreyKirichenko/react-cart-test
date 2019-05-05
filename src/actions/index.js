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

const removeItem = (id) => {
  console.log('removeItem', id);
  return {
    type: 'ITEM_REMOVED_FROM_DATA',
    payload: id
  };
};

const updateItem = (itemData) => {
  return {
    type: 'ITEM_UPDATED_IN_DATA',
    payload: itemData
  };
};

const getItem = (itemId) => {
  return {
    type: 'ITEM_GET_FROM_DATA',
    payload: itemId
  };
};

const setCartPageNum = (num) => {
  return {
    type: 'SET_PAGE_CART_NUM',
    payload: num
  };
};

export {
  fetchData,
  removeItem,
  updateItem,
  getItem,
  setCartPageNum
};