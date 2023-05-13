import {
  ACTIONS,
  CREATE_PRODUCT,
  CREATE_REVIEW_PRODUCT,
  DELETE_PRODUCTS,
  DETAILS,
  EDIT_PRODUCT,
  TOP_RATED_PRODUCTS,
} from "../constants/productsConst";
import axios from "axios";
export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: ACTIONS.PRODUCT_LIST_REQUEST });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );
      dispatch({
        type: ACTIONS.PRODUCT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACTIONS.PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const productsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAILS.PRODUCT_DETAILS_IMPORT });
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: DETAILS.PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAILS.PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PRODUCTS.PRODUCT_DELETE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);

    dispatch({
      type: DELETE_PRODUCTS.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PRODUCTS.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PRODUCT.PRODUCT_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);

    dispatch({
      type: CREATE_PRODUCT.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const editProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_PRODUCT.PRODUCT_EDIT_REQUEST });
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
      `/api/products/${product._id}`,
      product,
      config
    );

    dispatch({
      type: EDIT_PRODUCT.PRODUCT_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_PRODUCT.PRODUCT_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createReviewProduct =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: CREATE_REVIEW_PRODUCT.CREATE_REVIEW_PRODUCT_REQUEST });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        config
      );

      dispatch({
        type: CREATE_REVIEW_PRODUCT.CREATE_REVIEW_PRODUCT_SUCCESS,
        payload: data,
      });
      dispatch(productsDetails(productId));
    } catch (error) {
      dispatch({
        type: CREATE_REVIEW_PRODUCT.CREATE_REVIEW_PRODUCT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: TOP_RATED_PRODUCTS.TOP_RATED_PRODUCTS_REQUEST });
    const { data } = await axios.get(`/api/products/top`);
    dispatch({
      type: TOP_RATED_PRODUCTS.TOP_RATED_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOP_RATED_PRODUCTS.TOP_RATED_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
