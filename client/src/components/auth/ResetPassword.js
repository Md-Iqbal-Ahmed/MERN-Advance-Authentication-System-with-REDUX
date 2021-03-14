import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utlis/notification/Notification";

const initialState = {
  password: "",
  confirmPassword: "",
  error: "",
  success: "",
};

const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();
  const history = useHistory();

  const { password, confirmPassword, error, success } = data;

  const handleChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const resetPassword = async () => {
    try {
      const res = await axios.put(
        "/user/reset_password",
        {
          password,
          confirmPassword,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({ ...data, error: "", success: res.data.msg });

      history.push("/login");
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, error: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="forgot_password">
      <h2>Reset Your Password!</h2>
      <div className="row">
        {error && showErrMsg(error)}
        {success && showSuccessMsg(success)}
        <label htmlFor="password">Enter your new password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handleChangeInput}
        />
        <label htmlFor="password">Confirm your new password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          value={confirmPassword}
          onChange={handleChangeInput}
        />
        <button onClick={resetPassword}>Reset Password</button>
      </div>
    </div>
  );
};

export default ResetPassword;
