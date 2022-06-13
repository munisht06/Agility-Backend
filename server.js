// const app = require("./index");
// const PORT = process.env.PORT || 8000;

// app.listen(8000, () => {
//   console.log(`Started on port ${PORT}`);
// });

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.listen(8000, () => {
  console.log(`"Server started on port 5000" ${process.env.PORT}`);
});
