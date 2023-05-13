import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productEditReducer,
  createReviewProductReducer,
  topRatedProductReducer,
} from "./reducers/productReducers";
import cartReducer from "./reducers/cartReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  listMyOrderReducer,
  orderPayReducer,
  listOrderSReducer,
  orderDeliverReducer,
} from "./reducers/orderReducer";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  usersListReducer,
  deleteUserReducer,
  editUserReducer,
} from "./reducers/userReducer";
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  createReviewProduct: createReviewProductReducer,
  topRatedProduct :topRatedProductReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  usersList: usersListReducer,
  userDelete: deleteUserReducer,
  userEdit: editUserReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver:orderDeliverReducer,
  listMyOrders: listMyOrderReducer,
  listOrders:listOrderSReducer,
});
const cartStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const userInfoStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const shippingAddressStorage = localStorage.getItem("shipping")
  ? JSON.parse(localStorage.getItem("shipping"))
  : {};
const paymentMethodStorage = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : "";
const initialState = {
  cart: {
    cartItems: cartStorage,
    shippingAddress: shippingAddressStorage,
    paymentMethod: paymentMethodStorage,
  },
  userLogin: { userInfo: userInfoStorage },
};
const middleware = [thunk];
const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
