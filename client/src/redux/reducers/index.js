import { combineReducers } from "redux";
import auth from "./authReducers";
import token from "./tokenReducer";
import user from "./userReducer";

export default combineReducers({
  auth,
  token,
  user,
});
