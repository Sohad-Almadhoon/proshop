import { CART_ACTION } from "../constants/cartConstants";

const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: ""  },
  action
) => {
  switch (action.type) {
    case CART_ACTION.CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find(
        (x) => x.productId === item.productId
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productId === existItem.productId ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_ACTION.CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.productId !== action.payload
        ),
      };
    case CART_ACTION.CART_SAVE_SHIPPPING_ADDRESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case CART_ACTION.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
export default cartReducer;
