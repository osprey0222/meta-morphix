const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const en = require("./utils/constants");
require("dotenv").config();
const { initializeApp } = require("firebase/app");

// routers
const userRoutes = require("./routes/userRoutes");
const dayPlanRoutes = require("./routes/dayPlannerRoutes");
const qnRoutes = require("./routes/quickNoteRoutes");

// express
const app = express();

const uri = process.env.MONGODB_ATLAS_URI;
const port = process.env.PORT;

mongoose
  .connect(uri)
  .then(() => {
    console.log(en.dbConnectionSuccess);
    app.listen(port, () => {
      console.log("Listening on port 8080.");
    });
  })
  .catch((err) => console.log(en.dbConnectionErr, err));

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/users", userRoutes);
app.use("/dayPlan", dayPlanRoutes);
app.use("/quickNote", qnRoutes);
