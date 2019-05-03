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

const fetchData = (dispatch, dataService) => () => {
  console.log(123);
  dispatch(dataRequested());

  const preloadedState = JSON.parse(window.localStorage.getItem('state'));

  if(preloadedState && preloadedState.data) {
    console.log('preloadedState.data', preloadedState);
    dispatch(dataLoaded(preloadedState.data));
    return;
  }

  dataService.getData()
    .then((data) => {
      dispatch(dataLoaded(data));
    })
    .catch((err) => {
      dispatch(dataError(err));
    });
};

const removeItem = (id) => {
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

export {
  fetchData,
  removeItem,
  updateItem,
  getItem
};