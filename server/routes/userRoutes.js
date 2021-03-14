const express = require("express");
const userContollers = require("../controllers/userController");
const auth = require("../middlewares/auth");
const authAdmin = require("../middlewares/authAdmin");

const router = express.Router();

router.post("/register", userContollers.register);

router.post("/activation", userContollers.activateEmail);

router.post("/login", userContollers.login);

router.post("/refresh_token", userContollers.getAccessToken);

router.post("/forgot_password", userContollers.forgotPassword);

router.put("/reset_password", auth, userContollers.resetPassword);

router.get("/infor", auth, userContollers.getUserInfor);

router.get("/all_info", auth, authAdmin, userContollers.getAllUserInfo);

router.get("/logout", userContollers.userLogout);

router.patch("/update", auth, userContollers.userUpdate);

router.patch(
  "/update_role/:id",
  auth,
  authAdmin,
  userContollers.updateUserRole
);

router.delete("/delete/:id", auth, authAdmin, userContollers.deleteUser);

router.post("/google_login", userContollers.google_login);

router.post("/facebook_login", userContollers.facebook_login);

module.exports = router;
