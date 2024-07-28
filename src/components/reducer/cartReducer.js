const initialState = [];

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART":
      return [...state, action.payload];
    case "ADD_QTY":
      return state.map((cart) =>
        cart.id === action.payload.id
          ? { ...cart, count: cart.count + 1 }
          : cart
      );
    case "REMOVE_QTY":
      return state
        .map((cart) =>
          cart.id === action.payload.id
            ? { ...cart, count: cart.count - 1 }
            : cart
        )
        .filter((cart) => cart.count > 0);
    case "CLEAR_CART":
      return initialState;
    default:
      return state;
  }
};
