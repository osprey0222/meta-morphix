const express = require("express");
const { authorized } = require("../middlewares/authorizationMiddleware");
const files = require("../controllers/filesController");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage(), dest: "uploads/" });

const router = express.Router();
router.post("/file", upload.array("files"), files);

module.exports = router;
