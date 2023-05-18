import {
  ACTIONS,
  CREATE_PRODUCT,
  CREATE_REVIEW_PRODUCT,
  DELETE_PRODUCTS,
  DETAILS,
  EDIT_PRODUCT,
  TOP_RATED_PRODUCTS,
} from "../constants/productsConst";

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case ACTIONS.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case ACTIONS.PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case ACTIONS.PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case DETAILS.PRODUCT_DETAILS_IMPORT:
      return { loading: true, ...state };
    case DETAILS.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case DETAILS.PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DETAILS.PRODUCT_DETAILS_RESET:
      return { product: { reviews: [] } };
    default:
      return state;
  }
};
export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCTS.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case DELETE_PRODUCTS.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PRODUCTS.PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case CREATE_PRODUCT.PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT.PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const productEditReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case EDIT_PRODUCT.PRODUCT_EDIT_REQUEST:
      return { loading: true };
    case EDIT_PRODUCT.PRODUCT_EDIT_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case EDIT_PRODUCT.PRODUCT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case EDIT_PRODUCT.PRODUCT_EDIT_RESET:
      return { product: {} };
    default:
      return state;
  }
};
export const createReviewProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW_PRODUCT.CREATE_REVIEW_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_REVIEW_PRODUCT.CREATE_REVIEW_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_REVIEW_PRODUCT.CREATE_REVIEW_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_REVIEW_PRODUCT.CREATE_REVIEW_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};
export const topRatedProductReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case TOP_RATED_PRODUCTS.TOP_RATED_PRODUCTS_REQUEST:
      return { loading: true, products: [] };
    case TOP_RATED_PRODUCTS.TOP_RATED_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case TOP_RATED_PRODUCTS.TOP_RATED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
