import {
  ORDERS_DELIVER_ACTIONS,
  ORDERS_LIST_ACTIONS,
  ORDER_ACTIONS,
  ORDER_DETAILS_ACTIONS,
  ORDER_LIST_ACTIONS,
  ORDER_PAY_ACTIONS,
} from "../constants/orderConstants";
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ACTIONS.ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_ACTIONS.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_ACTIONS.ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_ACTIONS.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_ACTIONS.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_ACTIONS.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_ACTIONS.ORDER_PAY_REQUEST:
      return { loading: true };
    case ORDER_PAY_ACTIONS.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAY_ACTIONS.ORDER_PAY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_PAY_ACTIONS.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_REQUEST:
      return { loading: true };
    case ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_FAIL:
      return { loading: false, error: action.payload };
    case ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};
export const listMyOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ACTIONS.ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case ORDER_LIST_ACTIONS.ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_ACTIONS.ORDER_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_ACTIONS.ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
export const listOrderSReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDERS_LIST_ACTIONS.ORDERS_LIST_REQUEST:
      return { loading: true };
    case ORDERS_LIST_ACTIONS.ORDERS_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDERS_LIST_ACTIONS.ORDERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
