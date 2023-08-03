const asyncHandler = require("express-async-handler");
const {
  getDownloadURL,
  deleteObject,
  uploadBytesResumable,
  getStorage,
  ref,
} = require("firebase/storage");
const { initializeApp } = require("firebase/app");
const { File } = require("../models/fileModel");
const { ObjectId } = require("mongodb");

const firebaseConfig = {
  apiKey: process.env.FB_API_KEY,
  authDomain: process.env.FB_AUTH_DOMAIN,
  projectId: process.env.FB_PROJECT_ID,
  storageBucket: process.env.FB_STORAGE_BUCKET,
  messagingSenderId: process.env.FB_MESSAGING_SENDER_ID,
  appId: process.env.FB_APP_ID,
  measurementId: process.env.FB_MEASUREMENT_ID,
};
initializeApp(firebaseConfig);
const storage = getStorage();

const getAllUserFiles = asyncHandler(async (req, res) => {
  const files = await File.find({
    _id: { $in: Object.values(req.user.files) },
  });

  res.json({
    data: files,
    status: 200,
    message: "Fetched Successfully",
  });
});

const uploadUserFile = asyncHandler(async (req, res) => {
  const file = req.file;
  const { originalname: name, mimetype: type, buffer, size } = file;

  const exists = await File.findOne({ name });
  if (exists) {
    res
      .status(400)
      .json({ status: 400, message: "File with same name already exists." });
    return;
  }

  // create new entry in Mongo
  const newFile = await File.create({
    name,
    type,
    size,
    downloadURL: "<URL>",
  });

  // Upload to firebase
  const storageRef = ref(storage, `files/${req.user.id}/${newFile.id}`);
  const snapshot = await uploadBytesResumable(storageRef, buffer, type);
  const downloadURL = await getDownloadURL(snapshot.ref);

  // Save the Link
  newFile.downloadURL = downloadURL;
  newFile.save();

  // save id to user
  req.user.files.push(newFile.id);
  req.user.save();

  res.json({
    data: { id: newFile.id, name, type, size, downloadURL },
    status: 200,
    message: "Upload File Successfully",
  });
});

const deleteUserFile = asyncHandler(async (req, res) => {
  const { fileId } = req.params;

  // Delete from Mongo
  await File.findOneAndDelete({ _id: fileId }, { new: true });
  const upadatedFiles = await File.find({});

  // Delete from Firebase
  const storageRef = ref(storage, `files/${req.user.id}/${fileId}`);
  await deleteObject(storageRef);

  // update user
  const index = req.user.files.indexOf(new ObjectId(fileId));
  if (index >= 0) {
    req.user.files.splice(index, 1);
    req.user.save();
  }

  res.json({
    data: upadatedFiles,
    status: 200,
    message: "Deleted File Successfully",
  });
});

module.exports = { uploadUserFile, getAllUserFiles, deleteUserFile };
