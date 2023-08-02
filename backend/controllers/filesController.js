const asyncHandler = require("express-async-handler");
const { DayPlanner } = require("../models/dayPlannerModel");
const moment = require("moment");
const { isDateValid } = require("../utils/utils");
const { firebase } = require("../app");
const {
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
  ref,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: "AIzaSyCRP7bfIFcq7ZtjABdtUER_O084s7ExKc4",
  authDomain: "x-metamorphix-x.firebaseapp.com",
  projectId: "x-metamorphix-x",
  storageBucket: "x-metamorphix-x.appspot.com",
  messagingSenderId: "417745673148",
  appId: "1:417745673148:web:f2d8294a58dc5d0484e9b9",
  measurementId: "G-B24PCDGKG4",
};
initializeApp(firebaseConfig);
const storage = getStorage();

const files = asyncHandler(async (req, res) => {
  console.log(req.files[0]);

  const storageRef = ref(storage, `files/${req.files[0].originalname}`);

  const snapshot = await uploadBytesResumable(
    storageRef,
    req.files[0].buffer,
    req.files[0].mimetype
  );

  const downloadURL = await getDownloadURL(snapshot.ref);

  res.json({
    data: req.files,
    downloadURL,
  });
});

module.exports = files;
