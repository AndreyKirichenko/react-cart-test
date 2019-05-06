const getIndexById = (data, itemId) => {
  return data.findIndex(({ id }) => id === itemId);
};

export { getIndexById };