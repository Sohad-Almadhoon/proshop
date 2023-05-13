import axios from "axios";
import {
  ORDERS_DELIVER_ACTIONS,
  ORDERS_LIST_ACTIONS,
  ORDER_ACTIONS,
  ORDER_DETAILS_ACTIONS,
  ORDER_LIST_ACTIONS,
  ORDER_PAY_ACTIONS,
} from "../constants/orderConstants";
export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_ACTIONS.ORDER_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        " Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/orders", order, config);

    dispatch({ type: ORDER_ACTIONS.ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ORDER_ACTIONS.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getOrderDetails =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: ORDER_DETAILS_ACTIONS.ORDER_DETAILS_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/orders/${id}`, config);
      dispatch({
        type: ORDER_DETAILS_ACTIONS.ORDER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_DETAILS_ACTIONS.ORDER_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const payOrder = ({id}, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_PAY_ACTIONS.ORDER_PAY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${id}/pay`,
      paymentResult,
      config
    );
    dispatch({
      type: ORDER_PAY_ACTIONS.ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_ACTIONS.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deliverOrder = ({ id} ) => async (dispatch, getState) => {

  try {
    dispatch({ type: ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);
    dispatch({
      type: ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_DELIVER_ACTIONS.ORDERS_DELIVER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_ACTIONS.ORDER_LIST_MY_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: ORDER_LIST_ACTIONS.ORDER_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ACTIONS.ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_LIST_ACTIONS.ORDERS_LIST_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);
    console.log(data);
    dispatch({
      type: ORDERS_LIST_ACTIONS.ORDERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDERS_LIST_ACTIONS.ORDERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
