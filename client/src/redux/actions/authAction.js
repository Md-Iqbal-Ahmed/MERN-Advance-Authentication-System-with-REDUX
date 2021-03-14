import axios from "axios";
import * as types from "../types";

export const dispatchLogin = () => {
  return {
    type: types.LOGIN,
  };
};

export const fetchSingleUser = async (token) => {
  const res = await axios.get("/user/infor", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetUser = (res) => {
  return {
    type: types.GET_USER,
    payload: {
      user: res.data,
      isAdmin: res.data.role === 1 ? true : false,
    },
  };
};
