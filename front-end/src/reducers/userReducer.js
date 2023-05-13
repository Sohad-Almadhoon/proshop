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

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN.USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN.USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER.USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
export const userDetailsReducer = (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    case USER_DETAILS.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS.USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_DETAILS.USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (
  state = {
    user: {},
  },
  action
) => {
  switch (action.type) {
    case USER_UPDATE.USER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, user: action.payload, success: true };
    case USER_UPDATE.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const usersListReducer = (
  state = {
    users: [],
  },
  action
) => {
  switch (action.type) {
    case USERS_LIST.USERS_LIST_REQUEST:
      return { loading: true };
    case USERS_LIST.USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case USERS_LIST.USERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USERS_LIST.USERS_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE.USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE.USER_DELETE_SUCCESS:
      return { loading: false, success:true };
    case USER_DELETE.USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const editUserReducer = (state = {user:{}}, action) => {
  switch (action.type) {
    case USERS_UPDATE.USERS_UPDATE_REQUEST:
      return { loading: true };
    case USERS_UPDATE.USERS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case USERS_UPDATE.USERS_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case USERS_UPDATE.USERS_UPDATE_RESET:
      return { user: {} };
    default:
      return state;
  }
};
