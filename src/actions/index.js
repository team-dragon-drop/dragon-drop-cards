export const addColumn = (name) => {
  return {
    type: 'ADD_COLUMN',
    id: Date.now().toString(),
    name
  };
};
