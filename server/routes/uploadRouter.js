const express = require("express");
const router = express.Router();
const uploadImageMiddleware = require("../middlewares/uploadImageMiddleware");
const uploadController = require("../controllers/uploadController");
const auth = require("../middlewares/auth");

router.post(
  "/upload_avatar",
  auth,
  uploadImageMiddleware,
  uploadController.uploadAvatar
);

module.exports = router;
