const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.listen(5000, () => {
  console.log("Server started on port 500 0");
});
