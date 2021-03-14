import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { showErrMsg, showSuccessMsg } from "../utlis/notification/Notification";
import { useDispatch } from "react-redux";
import { dispatchLogin } from "../../redux/actions/authAction";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";

const intialState = {
  email: "",
  password: "",
  error: "",
  success: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [user, setUser] = useState(intialState);

  const { email, password, error, success } = user;

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
      const res = await axios.post("/user/login", { email, password });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, error: err.response.data.msg, success: "" });
    }
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });
      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, error: err.response.data.msg, success: "" });
    }
  };
  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });
      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      dispatch(dispatchLogin());
      history.push("/");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, error: err.response.data.msg, success: "" });
    }
  };
  return (
    <div className="login_page">
      <h2>Login</h2>
      {error && showErrMsg(error)}
      {success && showSuccessMsg(success)}
      <form onSubmit={handleSubmit}>
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
          <div className="row">
            {" "}
            <button type="submit">Login</button>
            <Link to="/forgot_password">Forgot your password?</Link>
          </div>
          <p className="login_link">
            Open a new account! <Link to="/register"> Register</Link>{" "}
          </p>
        </div>
      </form>
      <div className="social_media_login">
        <GoogleLogin
          clientId="448700263557-8c48mrq9lt5tt98qm6ndl9i30elkbrve.apps.googleusercontent.com"
          buttonText="Login with Google Account"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="206515021229320"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>
    </div>
  );
};

export default Login;
