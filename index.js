const express = require("express");
const app = express();
//comment
app.use("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, console.log("Server is started on 5000"));
