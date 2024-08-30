// 1. Importing express
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./database/database");
const cors = require("cors");
// const multipart = require('connect-multiparty')
const fileUpload = require("express-fileupload");
require("./models/userModels");
// 2. Creating an express app
const app = express();

app.use(fileUpload());

app.use(express.static("public"));

//CORS Config
const corsOptions = {
  origin: true,
  credentials: true,
  optionSuccessStatus: 200,
};
//cors config
app.use(cors(corsOptions));

dotenv.config();

app.use(express.json());

connectDB();

// Defining the port and listen to the App
const PORT = process.env.PORT;

//Creating a test route
app.get("/test", (req, res) => {
  res.send("Hello Nepal, this is test API");
});

// create route to users(registration and login)
app.use("/api/user", require("./routes/userRoutes"));

//Configuring service routes
app.use("/api/service", require("./routes/serviceRoutes"));

app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});

module.exports = app;
