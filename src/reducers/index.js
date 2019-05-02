const reducer = (state, action) => {

  const initialState = {
    data: [],
    loading: true,
    error: null,
  };

  if(state === undefined) {
    return initialState;
  }

  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return {
        ...state,
        data: [],
        loading: true,
        error: null
      };

    case 'FETCH_DATA_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null
      };

    case 'FETCH_DATA_FAILURE':
      return {
        ...state,
        data: [],
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};

export default reducer;