import * as types from "../types";
import axios from "axios";

export const fetchAllUsers = async (token) => {
  const res = await axios.get("/user/all_info", {
    headers: { Authorization: token },
  });
  return res;
};

export const dispatchGetAllUsers = (res) => {
  return {
    type: types.GET_ALL_USER,
    payload: res.data,
  };
};
