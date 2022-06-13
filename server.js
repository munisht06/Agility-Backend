// const app = require("./index");
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Started on port ${PORT}`);
// });

const express = require("express");
const app = express();

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
