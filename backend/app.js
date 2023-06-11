const express = require("express");
const app = express();
const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/BU-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});


app.listen(5000, () => {
    console.log('Backend server is running ');
});