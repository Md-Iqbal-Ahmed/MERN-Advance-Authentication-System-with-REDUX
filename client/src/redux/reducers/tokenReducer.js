import * as types from "../types";

const initialState = "";

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_TOKEN: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default tokenReducer;
