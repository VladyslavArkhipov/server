const express = require("express");
const app = express();

app.get("/test", (req, res) => {
  res.send("GET request received successfully");
});

app.use("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, console.log("Server is started on 5000"));
