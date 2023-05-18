import { ORDER_LIST_ACTIONS } from "../constants/orderConstants";


import {
  USERS_LIST,
  USERS_UPDATE,
  USER_DELETE,
  USER_DETAILS,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  USER_UPDATE,
} from "../constants/userConstants";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN.USER_LOGIN_REQUEST });
    const config = {
      headers: {
        " Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/users/login", {
      email,
      password,
      config,
    });
    dispatch({ type: USER_LOGIN.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER.USER_REGISTER_REQUEST });
    const config = {
      headers: {
        " Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );
    dispatch({ type: USER_REGISTER.USER_REGISTER_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getUserDetails = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: USER_DETAILS.USER_DETAILS_REQUEST });
    const config = {
      headers: {
        " Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({ type: USER_DETAILS.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const updateUserProfile = (user) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: USER_UPDATE.USER_UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        " Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch({ type: USER_UPDATE.USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const listUsers = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: USERS_LIST.USERS_LIST_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users`, config);
    dispatch({ type: USERS_LIST.USERS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USERS_LIST.USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteUser = (id) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: USER_DELETE.USER_DELETE_REQUEST });
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/users/${id}`, config);
    dispatch({ type: USER_DELETE.USER_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: USER_DELETE.USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const editUser = (user) => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: USERS_UPDATE.USERS_UPDATE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/${user._id}`, user, config);
    console.log(data);
    dispatch({ type: USERS_UPDATE.USERS_UPDATE_SUCCESS });
    dispatch({ type: USER_DETAILS.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USERS_UPDATE.USERS_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("paymentMethod");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS.USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_ACTIONS.ORDER_LIST_MY_RESET });
  dispatch({ type: USERS_LIST.USERS_LIST_RESET });
  document.location.href = "/login";
};
