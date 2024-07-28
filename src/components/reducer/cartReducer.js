const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, action.payload];
    default:
      return state;
  }
};
