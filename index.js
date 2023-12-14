const express = require("express");
const Mailjet = require("node-mailjet");
const app = express();

app.use("/", (req, res) => {
  res.send("Server is running");
});

app.get("/test", (req, res) => {
  res.send("GET request received successfully");
});

app.listen(5000, console.log("Server is started on 5000"));
