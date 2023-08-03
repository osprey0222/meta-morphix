const express = require("express");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), dest: "uploads/" });
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
const {
  uploadUserFile,
  getAllUserFiles,
  deleteUserFile,
} = require("../controllers/filesController");

const router = express.Router();

// No authorization required.
router.get("/user/verify", verifyUser);
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);

// Authorization required; to access data.
router.get("/user", authorized, getUserInfo);

router.get("/user/tags", authorized, getTags);
router.post("/user/tags", authorized, postTag);
router.delete("/user/tags", authorized, deleteTag);

// Files - by user
router.get("/user/files", authorized, getAllUserFiles);
router.post("/user/file", authorized, upload.single("file"), uploadUserFile);
router.delete("/user/file/:fileId", authorized, deleteUserFile);

module.exports = router;
