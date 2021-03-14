import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utlis/notification/Notification";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  error: "",
  success: "",
};

const Register = () => {
  const [user, setUser] = useState(initialState);

  const { email, password, name, confirmPassword, error, success } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
      error: "",
      success: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/register", {
        email,
        password,
        name,
        confirmPassword,
      });

      setUser({ ...user, error: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, error: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="login_page">
      <h2>Register</h2>
      {error && showErrMsg(error)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="text"
            placeholder="Enter email address"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              id="confirmPassword"
              value={confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <button type="submit">Register</button>
            <p>
              Already Have an Account? <Link to="/login"> Login</Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
