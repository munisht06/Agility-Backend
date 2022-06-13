const app = require("./index");
const PORT = process.env.PORT || 8000;

app.listen(8000, () => {
  console.log(`Started on port ${PORT}`);
});

