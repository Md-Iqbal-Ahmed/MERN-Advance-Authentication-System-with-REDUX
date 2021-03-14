import * as types from "../types";

const users = [];

const usersReducer = (state = users, action) => {
  switch (action.type) {
    case types.GET_ALL_USER:
      return action.payload;
    default:
      return state;
  }
};

export default usersReducer;
