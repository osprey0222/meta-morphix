const express = require("express");
const {
  registerUser,
  loginUser,
  getUserInfo,
  verifyUser,
} = require("../controllers/userController");
const { authorized } = require("../middlewares/authorizationMiddleware");
const {
  getTags,
  postTag,
  deleteTag,
} = require("../controllers/tagsController");

const router = express.Router();

// No authorization required.
router.get("/user/verify", verifyUser);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// Authorization required; to access data.
router.get("/user", authorized, getUserInfo);

router.get("/user/tags", authorized, getTags);
router.post("/user/tags", authorized, postTag);
router.delete("/user/tags/:tagId", authorized, deleteTag);

module.exports = router;
