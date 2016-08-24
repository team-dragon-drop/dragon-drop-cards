var initialState = {
  columns: []
};

function reducer(state=initialState, action) {
  switch(action.type) {
    case 'ADD_COLUMN':
      return Object.assign({}, state, {
        columns: [
          ...state.columns,
          { name: action.name, cards: [] }
        ]
      });
    default:
      return state;
  }
}

export default reducer;
