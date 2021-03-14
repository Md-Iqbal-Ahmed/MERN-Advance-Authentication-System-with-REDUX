import React, { Profiler } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import ActivationEmail from "../auth/Activation";
import NotFound from "../utlis/not_found/NotFound";
import { useSelector } from "react-redux";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";
import Homepage from "../body/Homepage";
import Profile from "./profile/Profile";
import EditUser from "./profile/Edit_user";

const Body = () => {
  const auth = useSelector((state) => state.auth);
  const { isLogged, isAdmin } = auth;
  return (
    <section>
      <Switch>
        <Route exact path="/login" component={isLogged ? NotFound : Login} />
        <Route
          exact
          path="/register"
          component={isLogged ? NotFound : Register}
        />
        <Route
          exact
          path="/forgot_password"
          component={isLogged ? NotFound : ForgotPassword}
        />
        <Route exact path="/" component={Homepage} />
        <Route
          exact
          path="/user/reset/:token"
          component={isLogged ? NotFound : ResetPassword}
        />
        <Route
          exact
          path="/profile"
          component={isLogged ? Profile : NotFound}
        />
        <Route
          exact
          path="/profile"
          component={isLogged ? Profile : NotFound}
        />

        <Route
          exact
          path="/user/activate/:activation_token"
          component={ActivationEmail}
        />
        <Route
          exact
          path="/edit_user/:id"
          component={isAdmin ? EditUser : NotFound}
        />
        <Route exact path="*" component={NotFound} />
      </Switch>
    </section>
  );
};

export default Body;
