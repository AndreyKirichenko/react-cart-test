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
  dispatch(dataRequested());

  dataService.getData()
    .then((data) => {
      dispatch(dataLoaded(data));
    })
    .catch((err) => {
      dispatch(dataError(err));
    });
};

export {
  fetchData
};