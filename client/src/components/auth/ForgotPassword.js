import React, { useState } from "react";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utlis/notification/Notification";

const initialState = {
  email: "",
  error: "",
  success: "",
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);

  const { email, error, success } = data;

  const handleChangeInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const forgotPassword = async () => {
    try {
      const res = await axios.post("/user/forgot_password", { email });

      return setData({ ...data, error: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, error: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="forgot_password">
      <h2>Forgot Your Password?</h2>
      <div className="row">
        {error && showErrMsg(error)}
        {success && showSuccessMsg(success)}
        <label htmlFor="email">Enter your email address</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleChangeInput}
        />
        <button onClick={forgotPassword}>Verify your email</button>
      </div>
    </div>
  );
};

export default ForgotPassword;
