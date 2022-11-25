const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/task", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected"))
  .catch((error) => {
    console.log("error" + error.message);
  });
